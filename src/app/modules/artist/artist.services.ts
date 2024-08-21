import { TArtist } from "./artist.interface";
import { Artist } from "./artist.model";

const createArtistIntoDB = async (payload: TArtist) => {
  const result = await Artist.create(payload);
  return result;
};

const getArtistsIntoDB = async () => {
  const artists = await Artist.find().populate("albums");
  return artists;
};

const getSingleArtistIntoDB = async (id: string) => {
  const artist = await Artist.findById(id);
  return artist;
};

const updateArtistIntoDB = async (id: string, payload: Partial<TArtist>) => {
  const updatedData = await Artist.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedData;
};

const deleteArtistIntoDB = async (id: string) => {
  const deleteData = await Artist.findByIdAndUpdate(id);
  return deleteData;
};

export const artistServices = {
  createArtistIntoDB,
  getArtistsIntoDB,
  getSingleArtistIntoDB,
  updateArtistIntoDB,
  deleteArtistIntoDB,
};
