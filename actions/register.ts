"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { RegisterSchema } from "@/schemas";
//import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { sql } from "@vercel/postgres";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const myId = uuidv4();
  try {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields." };
    }

    const { name, password, email } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "User email already exists." };
    }

    /*await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });*/

    const verificationToken = await generateVerificationToken(email);

    const data = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    if (data?.error) {
      throw new Error("Une erreur est sur venue pendant l'opération");
    }

    await sql`
    INSERT INTO "User" (id,name,email,password)
    VALUES (${myId},${name}, ${email}, ${hashedPassword} )
    ON CONFLICT (id) DO NOTHING;
  `;
    return {
      success:
        "Enregistrement effectué avec success, vérifier votre email. régarder également dans les spams!",
    };
  } catch (error) {
    return {
      error: "Une erreur est sur venue pendant l'opération, réessayez SVP",
    };
  }
};
