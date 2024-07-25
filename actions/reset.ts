"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  try {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid emaiL!" };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "User email not found!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    const data = await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
    if (data.error) {
      throw new Error("Une erreur est survenue");
    }
    return {
      success:
        "L'email de mise à jour à été envoyé, vérifier en rgardant &galement dans les spams!",
    };
  } catch (error) {
    return { error: "Une erreur est survenue" };
    //throw new Error("Une erreur est survenue");
  }
};
