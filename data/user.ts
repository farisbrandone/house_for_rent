"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  noStore();
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id?: string) => {
  noStore();
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
};
