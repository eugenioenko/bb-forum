import { z } from "zod";

export const GithubClaimSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export type GithubClaimSchemaType = z.infer<typeof GithubClaimSchema>;
