import express from "express";
import { artistValidation } from "./artist.validation";
import { artistController } from "./artist.controller";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/",
  validateRequest(artistValidation.artistValidationSchema),
  artistController.createArtist
);
router.get("/", artistController.getAritsts);
router.get("/:id", artistController.getAritst);
router.put("/:id", artistController.updateArtist);
router.delete("/:id", artistController.deletedArtist);

export const artistRoutes = router;
