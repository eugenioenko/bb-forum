import { z } from "zod";

export const ThreadSchema = z.object({
  categoryId: z.string().uuid(),
  title: z.string().min(1),
  content: z.string().min(1),
});

export type ThreadSchemaType = z.infer<typeof ThreadSchema>;
