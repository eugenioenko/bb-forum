import { z } from "zod";

export const PositiveNumberSchema = z.number().min(0);

export type PositiveNumberSchemaType = z.infer<typeof PositiveNumberSchema>;
