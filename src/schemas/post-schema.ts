import { z } from "zod";

export const PostSchema = z.object({
  threadId: z.string().uuid(),
  title: z.string().min(4),
  content: z.string().min(1),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
