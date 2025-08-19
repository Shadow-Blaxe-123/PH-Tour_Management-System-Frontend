import z from "zod";

export const tourTypeSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name is too short" })
    .max(50, { error: "Name is too long" }),
});
