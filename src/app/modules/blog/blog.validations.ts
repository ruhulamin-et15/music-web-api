import { z } from "zod";

// Define the Zod schema
export const blogValidationSchema = z.object({
  blogTitle: z.string().nonempty({ message: "blogTitle is required" }),
  blogImage: z.string().nonempty({ message: "blogImage is required" }),
  blogType: z.string().nonempty({ message: "blogType is required" }),
  shortDescription: z
    .string()
    .nonempty({ message: "shortDescription is required" }),
  blogDescription: z
    .string()
    .nonempty({ message: "blogDescription is required" }),
});

export const blogValidation = {
  blogValidationSchema,
};
