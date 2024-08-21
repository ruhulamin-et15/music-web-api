import { model, Schema } from "mongoose";
import { TArtist } from "./artist.interface";

// Define the schema
const artistSchema = new Schema<TArtist>({
  artistName: {
    type: String,
    required: [true, "artistName is required"],
  },
  artistImage: {
    type: String,
    required: [true, "artistImage is required"],
  },
  artistBio: {
    type: String,
    required: [true, "artistBio is required"],
  },
  albums: {
    type: Array,
    ref: "Album",
    default: [],
  },
});

// Create the model
export const Artist = model<TArtist>("Artist", artistSchema);
