import { z } from "zod";

export const CreatePostSchema = z.object({
  threadId: z.string().uuid(),
  title: z.string().min(4),
  content: z.string().min(1),
});

export const UpdatePostSchema = z.object({
  postId: z.string().uuid(),
  title: z.string().min(4),
  content: z.string().min(1),
});

export type UpdatePostSchemaType = z.infer<typeof UpdatePostSchema>;
export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;
