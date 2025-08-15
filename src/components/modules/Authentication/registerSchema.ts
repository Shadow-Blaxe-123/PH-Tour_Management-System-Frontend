import z from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { error: "Name is too short" })
      .max(50, { error: "Name is too long" }),
    email: z.email(),
    password: z.string().min(8, { error: "Password is too short" }),
    confirmPassword: z.string().min(8, { error: "Password is too short" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default registerSchema;
