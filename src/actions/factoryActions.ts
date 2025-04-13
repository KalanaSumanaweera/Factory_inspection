// src/actions/factoryActions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "../lib/supabase";

export async function addFactory(formData: FormData) {
//   const { userId } = auth();
//   if (!userId) {
//     throw new Error("User not authenticated");
//   }

  const name = formData.get("name")?.toString();

  if (!name || name.trim() === "") {
    throw new Error("Factory name is required");
  }

  try {
    const { error } = await supabase
      .from("factories")
      .insert([{ name: name.trim() }]);

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to create factory");
    }
  } catch (error) {
    console.error("Error creating factory:", error);
    throw new Error("Failed to create factory");
  }
}