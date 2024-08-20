"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.songRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const song_validation_1 = require("./song.validation");
const song_controller_1 = require("./song.controller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(song_validation_1.songValidation.songValidationSchema), song_controller_1.songController.createSong);
router.get("/", song_controller_1.songController.getAllSong);
router.get("/:id", song_controller_1.songController.getSingleSong);
router.get("/category/:id", song_controller_1.songController.getSongsByCategory);
router.get("/:id/duration", song_controller_1.songController.getDurationByLyrics);
exports.songRoutes = router;
