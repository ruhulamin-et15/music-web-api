"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumValidation = void 0;
const zod_1 = require("zod");
const albumValidationSchema = zod_1.z.object({
    albumName: zod_1.z.string().min(1, "album name is required"),
    albumImage: zod_1.z.string().min(1, "album image is required"),
    artistName: zod_1.z.string().min(1, "artist name is required"),
    releasedDate: zod_1.z.string().min(1, "released date name is required"),
});
exports.albumValidation = {
    albumValidationSchema,
};
