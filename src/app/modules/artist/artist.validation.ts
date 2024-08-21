import { z } from "zod";

// Define the Zod schema
export const artistValidationSchema = z.object({
  artistName: z.string().nonempty({ message: "artistName is required" }),
  artistImage: z.string().nonempty({ message: "artistImage is required" }),
  artistBio: z.string().nonempty({ message: "artistBio is required" }),
});

export const artistValidation = {
  artistValidationSchema,
};
