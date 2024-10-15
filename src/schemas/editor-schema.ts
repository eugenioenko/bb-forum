import { z } from "zod";

export const EditorSchema = z.object({
  categoryId: z.string().uuid().optional(),
  threadId: z.string().uuid().optional(),
  postId: z.string().uuid().optional(),
  title: z.preprocess(
    (input) => (typeof input === "string" ? input.trim() : input),
    z.string().min(4)
  ),
  content: z.preprocess(
    (input) => (typeof input === "string" ? input.trim() : input),
    z.string().min(1)
  ),
});

export type EditorSchemaType = z.infer<typeof EditorSchema>;
