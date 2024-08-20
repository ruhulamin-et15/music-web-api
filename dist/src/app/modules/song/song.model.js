"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = require("mongoose");
// Define the schema
const songSchema = new mongoose_1.Schema({
    songName: {
        type: String,
        required: [true, "songName is required"],
    },
    songArtist: {
        type: String,
        required: [true, "songArtist is required"],
    },
    songAlbum: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Album",
        required: [true, "songAlbum is required"],
    },
    songDuration: {
        type: String,
        required: [true, "songDuration is required"],
    },
    releaseYear: {
        type: Number,
        required: [true, "releaseYear is required"],
    },
    genre: {
        type: String,
        required: [true, "genre is required"],
    },
    songLink: {
        type: String,
        required: [true, "song link is required"],
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Please select category"],
    },
    lyrics: [
        {
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
            line: { type: String, required: true },
        },
    ],
});
// Create the model
exports.Song = (0, mongoose_1.model)("Song", songSchema);
