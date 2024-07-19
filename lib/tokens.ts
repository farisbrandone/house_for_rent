import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

//import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { sql } from "@vercel/postgres";
import {
  typePasswordResetToken,
  typePasswordResetTokenNotNull,
  typeVerificationTokenNotNull,
} from "@/schemas/type";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  try {
    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
      /* await db.twoFactorToken.delete({
        where: {
          id: existingToken.id,
        },
      });*/

      await sql`DELETE FROM "TwoFactorToken" WHERE id = ${existingToken.id}`;
    }

    /*const twoFactorToken = await db.twoFactorToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return twoFactorToken;*/
    const twoFactorToken = await sql`
    INSERT INTO "TwoFactorToken" ( email,token,expires,)
    VALUES (${email}, ${token}, ${expires.toISOString()}, )
    ON CONFLICT (id) DO NOTHING;
  `;

    return twoFactorToken;
  } catch (error) {
    throw new Error("une erreur est survenue");
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const myId = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  try {
    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
      /* await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });*/
      await sql`DELETE FROM "PasswordResetToken" WHERE id = ${existingToken.id}`;
    }

    /* const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;*/

    const passwordResetToken = await sql`
  INSERT INTO "PasswordResetToken" ( id,email,token,expires,)
  VALUES (${myId},${email}, ${token}, ${expires.toISOString().split("T")[0]}, )
  ON CONFLICT (id) DO NOTHING;
`;

    return {
      id: myId,
      email: email,
      token: token,
      expires: expires.toISOString(),
    };
  } catch (error) {
    throw new Error("Une erreur est survenue");
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const myId = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000 * 2);
  console.log({ exp: expires.getTime() });
  try {
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      /* await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });*/

      await sql`DELETE FROM "VerificationToken" WHERE "id" = ${existingToken.id}`;
    }

    /*const verficationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return verficationToken;*/

    const verficationToken = await sql`
    INSERT INTO "VerificationToken" (id,email,token,expires)
    VALUES (${myId},${email}, ${token}, ${expires.toISOString()})
    ON CONFLICT (id) DO NOTHING;
  `;

    return {
      id: myId,
      email: email,
      token: token,
      expires: expires.toISOString(),
    };
  } catch (error) {
    throw new Error("Une erreur est survenue pendant le traitement");
  }
};
