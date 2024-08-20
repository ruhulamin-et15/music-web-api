import { z } from "zod";

const loginValidationSchema = z.object({
  _id: z.string().optional(),
  email: z
    .string({ required_error: "email is required" })
    .email("Invalid email format"),
  password: z.string({ required_error: "password is required" }),
});

export const AuthValidation = {
  loginValidationSchema,
};
