import { model, Schema } from "mongoose";
import { TAlbum } from "./album.interface";


// Define the schema
const albumSchema = new Schema<TAlbum>({
  albumName: {
    type: String,
    required: [true, "album name is required"],
  },
  albumImage: {
    type: String,
    required: [true, "album image is required"],
  },
  artistName: {
    type: String,
    required: [true, "artist name is required"],
  },
  releasedDate: {
    type: Date,
    required: [true, "released date is required"],
  },
});

// Create the model
export const Album = model("Album", albumSchema);
