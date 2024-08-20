"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const album_validation_1 = require("./album.validation");
const album_controller_1 = require("./album.controller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(album_validation_1.albumValidation.albumValidationSchema), album_controller_1.albumController.createAlbum);
router.get("/", album_controller_1.albumController.getAllAlbum);
router.get("/:id", album_controller_1.albumController.getSingleAlbum);
exports.albumRoutes = router;
