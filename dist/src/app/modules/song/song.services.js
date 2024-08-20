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
Object.defineProperty(exports, "__esModule", { value: true });
exports.songServices = void 0;
const song_model_1 = require("./song.model");
const createSongIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield song_model_1.Song.create(payload);
    return result;
});
const getSongFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield song_model_1.Song.find().populate("songAlbum").populate("category");
    return result;
});
const getSingleSongFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield song_model_1.Song.findById(id)
        .populate("songAlbum")
        .populate("category");
    return result;
});
const getSongsByCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.Song.find({ category: id })
        .populate("songAlbum")
        .populate("category");
    return songs;
});
exports.songServices = {
    createSongIntoDB,
    getSongFromDB,
    getSingleSongFromDB,
    getSongsByCategoryFromDB,
};
