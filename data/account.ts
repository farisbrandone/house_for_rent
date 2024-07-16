//import { db } from "@/lib/db";
import { typeAccount } from "@/schemas/type";
import { sql } from "@vercel/postgres";

export const getAccountByUserId = async (userId: string) => {
  try {
    /*const account = await db.account.findFirst({
      where: { userId },
    });*/
    const account =
      await sql`SELECT * FROM Account WHERE id=${userId}  LIMIT ${1}`;
    return account.rows[0] as typeAccount;

    //return account;
  } catch {
    return null;
  }
};
