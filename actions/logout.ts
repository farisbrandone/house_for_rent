"use server";

import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logout = async () => {
  // Server-side actions, like clearing cookies in the client-side code,
  // before or after calling signOut().
  // ...
  console.log("logout action");
  await signOut();
  revalidatePath("/");
  redirect("/");
};
