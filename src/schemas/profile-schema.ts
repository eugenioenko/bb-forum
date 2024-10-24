import { z } from "zod";

export const ProfileSchema = z.object({
  bio: z.string().min(1).max(333),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
