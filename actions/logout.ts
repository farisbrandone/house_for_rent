"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // Server-side actions, like clearing cookies in the client-side code,
  // before or after calling signOut().
  // ...
  console.log("logout action");
  await signOut();
};
