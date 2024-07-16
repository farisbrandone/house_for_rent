"use server";

//import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { sql } from "@vercel/postgres";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User not registered!" };
  }

  /*await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });*/

  await sql`
  UPDATE User
  SET emailVerified=${new Date().toISOString().split("T")[0]},email=${
    existingToken.email
  }
  WHERE id = ${existingUser.id}
`;

  /*await db.verificationToken.delete({
    where: { id: existingToken.id },
  });*/

  await sql`DELETE FROM VerificationToken WHERE id = ${existingToken.id}`;

  console.log("to success");
  return { success: "Account verified!" };
};
