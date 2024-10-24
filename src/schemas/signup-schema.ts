import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string().min(2).max(32),
  email: z.string().email(),
  password: z.string().min(6).max(64),
});

export const SignupFormSchema = z
  .object({
    username: z.string().min(2).max(32),
    email: z.string().email(),
    password: z.string().min(6).max(64),
    confirmPassword: z.string().min(6).max(64),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupSchemaType = z.infer<typeof SignupSchema>;
export type SignupFormSchemaType = z.infer<typeof SignupFormSchema>;
