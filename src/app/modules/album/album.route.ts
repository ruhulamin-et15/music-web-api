import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { albumValidation } from "./album.validation";
import { albumController } from "./album.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(albumValidation.albumValidationSchema),
  albumController.createAlbum
);
router.get("/", albumController.getAllAlbum)
router.get("/:id", albumController.getSingleAlbum)

export const albumRoutes = router;