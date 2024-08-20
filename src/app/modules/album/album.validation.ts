import { z } from "zod";

const albumValidationSchema = z.object({
  albumName: z.string().min(1, "album name is required"),
  albumImage: z.string().min(1, "album image is required"),
  artistName: z.string().min(1, "artist name is required"),
  releasedDate: z.string().min(1, "released date name is required"),
});

export const albumValidation = {
  albumValidationSchema,
};
