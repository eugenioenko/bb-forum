import { z } from "zod";

export const GoogleClaimSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  picture: z.string().optional(),
  email_verified: z.boolean(),
});

export type GoogleClaimSchemaType = z.infer<typeof GoogleClaimSchema>;
