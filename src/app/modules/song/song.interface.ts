import { ObjectId } from "mongoose";

interface Lyric {
  startTime: string;
  endTime: string;
  line: string;
}

export interface TSong {
  songName: string;
  songArtist: string;
  songLink: string;
  songAlbum: ObjectId;
  songDuration: string;
  releaseYear: number;
  genre: string;
  category: ObjectId;
  lyrics: Lyric[];
  isFavourite: boolean;
  album: ObjectId;
}
