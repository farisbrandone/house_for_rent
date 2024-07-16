//import { db } from "@/lib/db";
import { typeTwoFactorConfirmation } from "@/schemas/type";
import { sql } from "@vercel/postgres";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    /* const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return twoFactorConfirmation;*/

    const twoFactorConfirmation = await sql`
    SELECT
      * FROM TwoFactorConfirmation
    WHERE userId=${userId} 
  `;
    return twoFactorConfirmation.rows[0] as typeTwoFactorConfirmation;
  } catch {
    return null;
  }
};
