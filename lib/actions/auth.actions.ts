"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { SignInValidation, SignUpValidation } from "../validation";
import { database } from "../database";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from "./user.actions";

export const handleSignUpAction = async (values: z.infer<typeof SignUpValidation>) => {
  const validatedFields = SignUpValidation.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) { return { error: "Email already existed!" } }

  const hashedPassword = await bcrypt.hash(password, 10);
  await database.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  try {
    await signIn("credentials", { email, password, redirect: true, redirectTo: DEFAULT_LOGIN_REDIRECT });
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error;
  }

  return { success: "Account created successfully!" }
}

export const handleSignInAction = async (values: z.infer<typeof SignInValidation>, callBackUrl: string | null) => {
  const validatedFields = SignInValidation.safeParse(values);
  if (!validatedFields.success) { return { error: "Invalid fields!" } }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) { return { error: "Invalid credentials!" } }

  try {
    await signIn("credentials", { email, password, redirect: true, redirectTo: callBackUrl || DEFAULT_LOGIN_REDIRECT });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error;
  }
  return { success: "Email sent!" }
}