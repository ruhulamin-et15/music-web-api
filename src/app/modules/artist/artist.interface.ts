import { ObjectId } from "mongoose";

export interface TArtist {
  artistName: string;
  artistImage: string;
  artistBio: string;
  albums: ObjectId;
}
