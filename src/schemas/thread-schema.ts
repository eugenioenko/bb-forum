import { z } from "zod";

export const ThreadSchema = z.object({
  categoryId: z.string().uuid().optional(),
  threadId: z.string().uuid().optional(),
  title: z.string().min(4),
  content: z.string().min(1),
});

export type ThreadSchemaType = z.infer<typeof ThreadSchema>;
