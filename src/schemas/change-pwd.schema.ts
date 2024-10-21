import { z } from "zod";

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(6).max(64),
  newPassword: z.string().min(6).max(64),
  confirmPassword: z.string().min(6).max(64),
});

export const ChangePasswordSchemaRefined = ChangePasswordSchema.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
