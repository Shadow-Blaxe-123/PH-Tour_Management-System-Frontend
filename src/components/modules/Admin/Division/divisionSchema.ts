import z from "zod";

const divisionZodSchema = z.object({
  name: z
    .string("Name must be a string")
    .min(2, "Too Short")
    .max(50, "Too Long"),
  description: z.string("Description must be a string").optional(),
});

export default divisionZodSchema;
