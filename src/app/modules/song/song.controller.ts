import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { songServices } from "./song.services";
import { Album } from "../album/album.model";
import { UserModel } from "../../user/user.model";

const createSong = catchAsync(async (req, res) => {
  const { songAlbum } = req.body;
  const result = await songServices.createSongIntoDB(req.body);

  const songId = result._id;

  await Album.findByIdAndUpdate(
    songAlbum,
    { $push: { songs: songId } },
    { new: true }
  );
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Song is created successfully",
    data: result,
  });
});

const getAllSong = catchAsync(async (req, res) => {
  const result = await songServices.getSongFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event items retrieved successfully",
    data: result,
  });
});

const getSingleSong = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await songServices.getSingleSongFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Song is retrieved successfully",
    data: result,
  });
});

const getSongsByCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  const songs = await songServices.getSongsByCategoryFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "songs retrived successfully",
    data: songs,
  });
});

// const getDurationByLyrics = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const timeQuery = req.query.time;

//   const timeToSeconds = (timeStr: string): number => {
//     const [hours, minutes, seconds] = timeStr.split(":").map(Number);
//     return hours * 3600 + minutes * 60 + seconds;
//   };

//   const searchTime =
//     typeof timeQuery === "string" ? parseFloat(timeQuery) : NaN;

//   if (isNaN(searchTime)) {
//     return res
//       .status(400)
//       .json({ message: "Invalid or missing time parameter" });
//   }

//   const song = await songServices.getSingleSongFromDB(id);

//   if (!song) {
//     sendResponse(res, {
//       success: false,
//       statusCode: 404,
//       message: "song not found",
//       data: {},
//     });
//   }

//   const lyrics = song?.lyrics || [];

//   // Find the lyric line that covers the specified time
//   const lyricLine = lyrics.find((lyric) => {
//     const lyricStart = timeToSeconds(lyric.startTime);
//     const lyricEnd = timeToSeconds(lyric.endTime);
//     return lyricStart <= searchTime && lyricEnd >= searchTime;
//   });

//   if (!lyricLine) {
//     return sendResponse(res, {
//       success: false,
//       statusCode: 404,
//       message: "No lyric found for the specified time",
//       data: {},
//     });
//   }

//   // Send the response with the found lyric line
//   return sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Lyric found successfully",
//     data: lyricLine,
//   });
// });

const getDurationByLyrics = catchAsync(async (req, res) => {
  const { id } = req.params;

  const timeToSeconds = (timeStr: string): number => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const fixedRanges = [
    { start: timeToSeconds("00:00:10"), end: timeToSeconds("00:00:15") }, // First line
    { start: timeToSeconds("00:00:16"), end: timeToSeconds("00:00:20") }, // Second line
    // { start: timeToSeconds("00:00:21"), end: timeToSeconds("00:00:25") }, // 3rd line
  ];

  const song = await songServices.getSingleSongFromDB(id);

  if (!song) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Song not found",
      data: {},
    });
  }

  const lyrics = song?.lyrics || [];

  const filteredLyrics = fixedRanges.map((range) => {
    return lyrics.find((lyric) => {
      const lyricStart = timeToSeconds(lyric.startTime);
      const lyricEnd = timeToSeconds(lyric.endTime);
      return lyricStart >= range.start && lyricEnd <= range.end;
    });
  });

  if (filteredLyrics.every((lyric) => lyric === undefined)) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "No lyrics found for the specified time ranges",
      data: {},
    });
  }

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Lyrics found successfully",
    data: {
      lyrics,
      song,
    },
  });
});

const favHandler = catchAsync(async (req, res) => {
  const { id, userId } = req.params;

  const song = await songServices.getSingleSongFromDB(id);

  if (!song) {
    sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "song not found",
      data: {},
    });
  }

  if (song?.isFavourite === false) {
    const updateSong = await songServices.updateSongIntoDB(id, {
      isFavourite: true,
    });
    const favSongId = updateSong?._id;
    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { playList: favSongId } },
      { new: true }
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "update song from unfavourite to favourite",
      data: { IsFavourite: true },
    });
  } else {
    const updateSong = await songServices.updateSongIntoDB(id, {
      isFavourite: false,
    });

    const favSongId = updateSong?._id;
    await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { playList: favSongId } },
      { new: true }
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "update song from favourite to unfavourite",
      data: { IsFavourite: false },
    });
  }
});

export const songController = {
  createSong,
  getAllSong,
  getSingleSong,
  getSongsByCategory,
  getDurationByLyrics,
  favHandler,
};
