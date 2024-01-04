import { user_role } from "@prisma/client";
import * as z from "zod";

export const SignInValidation = z.object({
  email: z.string().email({
    message: "Email is required!"
  }),
  password: z.string().min(1, {
    message: "Password is required!"
  }),
  code: z.optional(z.string())
})

export const SignUpValidation = z.object({
  email: z.string().email({
    message: "Email is required!"
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required!"
  }),
  name: z.string().min(1, {
    message: "Name is required!"
  })
})

export const ResetPasswordValidation = z.object({
  email: z.string().email({
    message: "Email is required!"
  })
})

export const NewPasswordValidation = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required!"
  })
})

export const ChangeInfoValidation = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
  isEnableTwoFactor: z.optional(z.boolean()),
  role: z.enum([user_role.ADMIN, user_role.USER])
}).refine((data) => {
  if (data.password && !data.newPassword) return false;
  return true;
}, {
  message: "New password is required!",
  path: ["newPassword"]
}).refine((data) => {
  if (data.newPassword && !data.password) return false;
  return true;
}, {
  message: "Password is required!",
  path: ["password"]
})