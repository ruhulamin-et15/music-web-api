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
exports.AlbumServices = void 0;
const album_model_1 = require("./album.model");
const createAlbumIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield album_model_1.Album.create(payload);
    return result;
});
const getAlbumFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield album_model_1.Album.find();
    return result;
});
const getSingleAlbumFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield album_model_1.Album.findById(id);
    return result;
});
exports.AlbumServices = {
    createAlbumIntoDB,
    getAlbumFromDB,
    getSingleAlbumFromDB,
};
