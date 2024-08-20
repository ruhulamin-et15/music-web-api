"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.songController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const song_services_1 = require("./song.services");
const createSong = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield song_services_1.songServices.createSongIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Song is created successfully",
        data: result,
    });
}));
const getAllSong = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield song_services_1.songServices.getSongFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event items retrieved successfully",
        data: result,
    });
}));
const getSingleSong = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield song_services_1.songServices.getSingleSongFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Song is retrieved successfully",
        data: result,
    });
}));
const getSongsByCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const songs = yield song_services_1.songServices.getSongsByCategoryFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "songs retrived successfully",
        data: songs,
    });
}));
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
const getDurationByLyrics = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const timeToSeconds = (timeStr) => {
        const [hours, minutes, seconds] = timeStr.split(":").map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };
    const fixedRanges = [
        { start: timeToSeconds("00:00:10"), end: timeToSeconds("00:00:15") }, // First line
        { start: timeToSeconds("00:00:16"), end: timeToSeconds("00:00:20") }, // Second line
        // { start: timeToSeconds("00:00:21"), end: timeToSeconds("00:00:25") }, // 3rd line
    ];
    const song = yield song_services_1.songServices.getSingleSongFromDB(id);
    if (!song) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "Song not found",
            data: {},
        });
    }
    const lyrics = (song === null || song === void 0 ? void 0 : song.lyrics) || [];
    const filteredLyrics = fixedRanges.map((range) => {
        return lyrics.find((lyric) => {
            const lyricStart = timeToSeconds(lyric.startTime);
            const lyricEnd = timeToSeconds(lyric.endTime);
            return lyricStart >= range.start && lyricEnd <= range.end;
        });
    });
    if (filteredLyrics.every((lyric) => lyric === undefined)) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "No lyrics found for the specified time ranges",
            data: {},
        });
    }
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Lyrics found successfully",
        data: {
            lyrics,
            song,
        },
    });
}));
exports.songController = {
    createSong,
    getAllSong,
    getSingleSong,
    getSongsByCategory,
    getDurationByLyrics,
};
