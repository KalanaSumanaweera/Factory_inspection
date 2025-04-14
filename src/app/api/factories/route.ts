import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "../../../lib/supabase";

// GET all factories
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("factories")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to fetch factories" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching factories:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST new factory
export async function POST(request: Request) {
  const authData = await auth(); // 🛠️ Fix: await this
  const userId = authData.userId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name } = await request.json();

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Factory name is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("factories")
      .insert([{ name: name.trim() }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to create factory" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating factory:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
