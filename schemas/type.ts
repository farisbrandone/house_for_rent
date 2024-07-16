enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type typeUser = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: UserRole;
  isTwoFactorEnabled: boolean;
} | null;

export type typeAccount = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
} | null;

export type typeTwoFactorToken = {
  id: string;
  email: string;
  token: string;
  expires: Date;
} | null;

export type typePasswordResetToken = {
  id: string;
  email: string;
  token: string;
  expires: Date;
} | null;

export type typePasswordResetTokenNotNull = {
  id: string;
  email: string;
  token: string;
  expires: Date;
};

export type typeVerificationToken = {
  id: string;
  email: string;
  token: string;
  expires: Date;
} | null;

export type typeVerificationTokenNotNull = {
  id: string;
  email: string;
  token: string;
  expires: Date;
};

export type typeTwoFactorConfirmation = {
  id: string;
  userId: string;
} | null;
