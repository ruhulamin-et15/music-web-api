import { model, Schema } from "mongoose";
import { TSong } from "./song.interface";

// Define the schema
const songSchema = new Schema<TSong>({
  songName: {
    type: String,
    required: [true, "songName is required"],
  },
  songArtist: {
    type: String,
    required: [true, "songArtist is required"],
  },
  songAlbum: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: [true, "songAlbum is required"],
  },
  songDuration: {
    type: String,
    required: [true, "songDuration is required"],
  },
  releaseYear: {
    type: Number,
    required: [true, "releaseYear is required"],
  },
  genre: {
    type: String,
    required: [true, "genre is required"],
  },
  songLink: {
    type: String,
    required: [true, "song link is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please select category"],
  },
  lyrics: [
    {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      line: { type: String, required: true },
    },
  ],
});

// Create the model
export const Song = model<TSong>("Song", songSchema);
