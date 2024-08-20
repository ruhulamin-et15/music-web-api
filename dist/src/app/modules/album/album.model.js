"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const mongoose_1 = require("mongoose");
// Define the schema
const albumSchema = new mongoose_1.Schema({
    albumName: {
        type: String,
        required: [true, "album name is required"],
    },
    albumImage: {
        type: String,
        required: [true, "album image is required"],
    },
    artistName: {
        type: String,
        required: [true, "artist name is required"],
    },
    releasedDate: {
        type: Date,
        required: [true, "released date is required"],
    },
});
// Create the model
exports.Album = (0, mongoose_1.model)("Album", albumSchema);
