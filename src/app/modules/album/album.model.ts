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
  artistId: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: [true, "please select artist name"],
  },
  releasedDate: {
    type: Date,
    required: [true, "released date is required"],
  },
  songs: {
    type: Array,
    ref: "Song",
    default: [],
  },
  genre: {
    type: String,
    required: [true, "genre is required"],
  },
});

// Create the model
export const Album = model("Album", albumSchema);
