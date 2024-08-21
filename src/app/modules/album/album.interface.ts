import { ObjectId } from "mongoose";

export interface TAlbum {
  albumName: string;
  albumImage: string;
  artistId: ObjectId;
  releasedDate: Date;
}
