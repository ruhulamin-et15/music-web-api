import { TAlbum } from "./album.interface";
import { Album } from "./album.model";



const createAlbumIntoDB = async (payload: TAlbum) => {
  const result = await Album.create(payload);

  return result;
};
const getAlbumFromDB = async () => {
  const result = await Album.find();
  return result;
};
const getSingleAlbumFromDB = async (id: string) => {
  const result = await Album.findById(id);

  return result;
};

export const AlbumServices = {
  createAlbumIntoDB,
  getAlbumFromDB,
  getSingleAlbumFromDB,
};
