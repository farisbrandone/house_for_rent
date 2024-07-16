//import { db } from "@/lib/db";
import { typeTwoFactorToken } from "@/schemas/type";
import { sql } from "@vercel/postgres";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    /* const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;*/

    const twoFactorToken =
      await sql`SELECT * FROM TwoFactorToken WHERE token=${token}`;
    return twoFactorToken.rows[0] as typeTwoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    /*const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;*/

    const twoFactorToken =
      await sql`SELECT * FROM TwoFactorToken WHERE email=${email} LIMIT ${1}`;
    return twoFactorToken.rows[0] as typeTwoFactorToken;
  } catch {
    return null;
  }
};
