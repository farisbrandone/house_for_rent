//import { db } from "@/lib/db";
import { typePasswordResetToken } from "@/schemas/type";
import { sql } from "@vercel/postgres";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    /*const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;*/

    const passwordResetToken =
      await sql`SELECT * FROM "PasswordResetToken" WHERE token=${token}`;

    return passwordResetToken.rows[0] as typePasswordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    /* const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;*/

    const passwordResetToken =
      await sql`SELECT * FROM "PasswordResetToken" WHERE email=${email} LIMIT ${1}`;

    return passwordResetToken.rows[0] as typePasswordResetToken;
  } catch {
    return null;
  }
};
