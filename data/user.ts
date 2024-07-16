"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

//import { db } from "@/lib/db";
import { sql } from "@vercel/postgres";
import { typeUser } from "@/schemas/type";

export const getUserByEmail = async (email: string) => {
  noStore();
  try {
    /* const user = await db.user.findUnique({
      where: { email },
    });
    return user;*/
    const user = await sql`SELECT * FROM User WHERE email=${email}`;
    return user.rows[0] as typeUser;
  } catch {
    return null;
  }
};

export const getUserById = async (id?: string) => {
  noStore();
  try {
    /*const user = await db.user.findUnique({
      where: { id },
    });*/

    const user = await sql`SELECT * FROM User WHERE id=${id}`;
    return user.rows[0] as typeUser;
    //return user;
  } catch {
    return null;
  }
};
