"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songValidation = exports.songValidationSchema = void 0;
const zod_1 = require("zod");
const lyricSchema = zod_1.z.object({
    startTime: zod_1.z.string().nonempty({ message: "startTime is required" }),
    endTime: zod_1.z.string().nonempty({ message: "endTime is required" }),
    line: zod_1.z.string().nonempty({ message: "line is required" }),
});
// Define the Zod schema
exports.songValidationSchema = zod_1.z.object({
    songName: zod_1.z.string().nonempty({ message: "songName is required" }),
    songArtist: zod_1.z.string().nonempty({ message: "songArtist is required" }),
    songAlbum: zod_1.z.string().nonempty({ message: "songAlbum is required" }),
    songDuration: zod_1.z.string().nonempty({ message: "songDuration is required" }),
    releaseYear: zod_1.z
        .number()
        .int()
        .min(1900, { message: "releaseYear must be a valid year" })
        .max(new Date().getFullYear(), {
        message: "releaseYear cannot be in the future",
    }),
    genre: zod_1.z.string().nonempty({ message: "genre is required" }),
    lyrics: zod_1.z
        .array(lyricSchema)
        .nonempty({ message: "At least one lyric is required" }),
});
// Example usage
// const songData = {
//   songName: "Some Song",
//   songArtist: "Some Artist",
//   songAlbum: "Some Album",
//   songDuration: "3:45",
//   releaseYear: 2022,
//   genre: "Pop",
// };
//
// SongSchema.parse(songData);
exports.songValidation = {
    songValidationSchema: exports.songValidationSchema,
};
