import { z } from "zod";

export const ProfileSchema = z.object({
  username: z.string().min(2).max(32),
  bio: z.string().min(1).max(333),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
