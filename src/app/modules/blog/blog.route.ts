import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { blogValidation } from "./blog.validations";
import { blogController } from "./blog.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(blogValidation.blogValidationSchema),
  blogController.createBlog
);
router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getSingleBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deletedBlog);

export const blogRoutes = router;
