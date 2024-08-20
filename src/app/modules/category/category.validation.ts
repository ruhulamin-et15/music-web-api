import { z } from "zod";

// Define the Zod schema
export const categoryValidationSchema = z.object({
  CategoryName: z.string().nonempty({ message: "Category Name is required" }),
});

export const categoryValidation = {
  categoryValidationSchema,
};
