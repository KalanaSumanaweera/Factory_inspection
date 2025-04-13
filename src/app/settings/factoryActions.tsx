// src/actions/factoryActions.ts
"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addFactory(formData: FormData) {
  const name = formData.get("name")?.toString();

  if (!name || name.trim() === "") {
    throw new Error("Factory name is required");
  }

  try {
    await prisma.factory.create({
      data: {
        name: name.trim(),
      },
    });
  } catch (error) {
    console.error("Error creating factory:", error);
    throw new Error("Failed to create factory");
  } finally {
    await prisma.$disconnect();
  }
}
