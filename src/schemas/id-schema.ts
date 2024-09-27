import { z } from "zod";

export const IdSchema = z.object({
  id: z.string().uuid(),
});

export type IdSchemaType = z.infer<typeof IdSchema>;
