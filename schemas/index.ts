import * as z from "zod";
import { UserRole } from "@prisma/client";

interface UserData {
  password?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

const passwordRequired = (
  data: UserData,
  passwordField: keyof UserData,
  newPasswordField: keyof UserData,
  newPasswordConfirmationField: keyof UserData = "newPasswordConfirmation"
) => {
  const newPasswordEntered = data[newPasswordField] !== undefined;
  const confirmationEntered = data[newPasswordConfirmationField] !== undefined;

  if (newPasswordEntered && !confirmationEntered) {
    return false;
  }

  return !(
    (data[passwordField] && !data[newPasswordField]) ||
    (data[newPasswordField] && !data[passwordField])
  );
};

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(1)),
    newPassword: z.optional(
      z.string().min(6, {
        message:
          "Please enter a new password with at least 6 characters, required",
      })
    ),
    newPasswordConfirmation: z.optional(
      z.string().min(6, {
        message:
          "Please confirm your password with at least 6 characters, required",
      })
    ),
  })
  .refine((data) => passwordRequired(data, "password", "newPassword"), {
    message:
      "Please enter a new password with at least 6 characters, required!",
    path: ["newPassword"],
  })
  .refine((data) => passwordRequired(data, "newPassword", "password"), {
    message: "Please enter your valid password, required!",
    path: ["password"],
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Passwords do not match.",
    path: ["newPasswordConfirmation"],
  });

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Please enter your password, required",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Please confirm your password, required.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address, required.",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address. Email is required.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password. Password is required.",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Please enter your name, required.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address, required.",
    }),
    password: z.string().min(6, {
      message: "Please enter a password with at least 6 characters, required",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Please confirm your password, required.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
  });

export const FormSchema = z.object({
  typeOffre: z
    .string({
      required_error: "La selection d'un type d'offre est requis.",
    })
    .min(3),
  nomOffre: z
    .string({
      required_error: "La Fourniture d'un nom a votre offre est requis.",
    })
    .min(5),
  paysOffre: z
    .string({
      required_error: "La selection d'un pays est requis.",
    })
    .min(3),
  villeOffre: z
    .string({
      required_error: "La selection d'une ville est requis.",
    })
    .min(3),
  descriptifOffre: z
    .string()
    .min(100, {
      message: "Le descriptif doit avoir au moins 100 charactères.",
    })
    .max(2000, {
      message: "Le descriptif doit avoir au plus 2000 charactères.",
    }),
  nbreDeChambre: z.string().optional().default(""),
  nbreDeCuisine: z.string().optional().default(""),
  nbreDeDouche: z.string().optional().default(""),
  prixDuBien: z
    .string({
      required_error: "vous devez entrez un prix à votre bien",
    })
    .min(2),
  devise: z
    .string({
      required_error: "vous devez selectionner une devise",
    })
    .min(2),
  typeDeVente: z
    .string({
      required_error:
        "Vous devez selectionner la formule associée à votre prix",
    })
    .min(5),
  parking: z.boolean().optional().default(false),
  adresseEmail: z.string().email(),
  tel: z.string().optional().default(""),
  imageOffre: z.any().array().optional(),
  nameImage: z.any().array().optional(),
  dateInset: z.string().optional().default(""),
  lastUpdate: z.string().optional().default(""),
  userId: z.string().optional().default(""),
});
