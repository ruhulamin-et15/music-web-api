import { TSong } from "./song.interface";
import { Song } from "./song.model";

const createSongIntoDB = async (payload: TSong) => {
  const result = await Song.create(payload);
  return result;
};
const getSongFromDB = async () => {
  const result = await Song.find().populate("songAlbum").populate("category");
  return result;
};
const getSingleSongFromDB = async (id: string) => {
  const result = await Song.findById(id)
    .populate("songAlbum")
    .populate("category");
  return result;
};

const getSongsByCategoryFromDB = async (id: string) => {
  const songs = await Song.find({ category: id })
    .populate("songAlbum")
    .populate("category");
  return songs;
};

const updateSongIntoDB = async (id: string, payload: Partial<TSong>) => {
  const updatedData = await Song.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedData;
};

export const songServices = {
  createSongIntoDB,
  getSongFromDB,
  getSingleSongFromDB,
  getSongsByCategoryFromDB,
  updateSongIntoDB,
};
