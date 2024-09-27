import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(64),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;
