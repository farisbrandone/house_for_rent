//import { db } from "@/lib/db";
import { typeVerificationToken } from "@/schemas/type";
import { sql } from "@vercel/postgres";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    /* const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;*/

    const verificationToken =
      await sql`SELECT * FROM "VerificationToken" WHERE token=${token}`;

    return verificationToken.rows[0] as typeVerificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    /* const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;*/

    const verificationToken =
      await sql`SELECT * FROM "VerificationToken" WHERE email=${email} LIMIT ${1}`;

    return verificationToken.rows[0] as typeVerificationToken;
  } catch {
    return null;
  }
};
