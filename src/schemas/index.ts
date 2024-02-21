import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid Email" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid Email" }),
  password: z.string().min(6, {
    message: "Minimum 6 charcters is required",
  }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid Email" }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Minimum 6 charcters is required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    // This specifies that the error should be attached to the confirmPassword field
    path: ["confirmPassword"],
  });

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type ResetSchemaType = z.infer<typeof ResetSchema>;
export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;
