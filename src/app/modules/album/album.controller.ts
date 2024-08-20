import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AlbumServices } from "./album.services";

const createAlbum = catchAsync(async (req, res) => {
  const result = await AlbumServices.createAlbumIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Album is created successfully",
    data: result,
  });
});
const getAllAlbum = catchAsync(async (req, res) => {
  const result = await AlbumServices.getAlbumFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Albums are retrieved successfully",
    data: result,
  });
});
const getSingleAlbum = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AlbumServices.getSingleAlbumFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "album is retrieved successfully",
    data: result,
  });
});
export const albumController = {
  createAlbum,
  getAllAlbum,
  getSingleAlbum,
};
