import { z, ZodRawShape } from "zod";

export function validateSchemaOrThrow<T extends ZodRawShape>(
  schema: z.ZodObject<T>,
  data: any
): ReturnType<z.ZodObject<T>["parse"]> {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const error = parsed.error.issues.map((issue) => issue.message).join(", ");
    throw new Error(error);
  }

  return parsed.data;
}
