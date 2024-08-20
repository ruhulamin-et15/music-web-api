"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const blog_validations_1 = require("./blog.validations");
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(blog_validations_1.blogValidation.blogValidationSchema), blog_controller_1.blogController.createBlog);
router.get("/", blog_controller_1.blogController.getBlogs);
router.get("/:id", blog_controller_1.blogController.getSingleBlog);
router.put("/:id", blog_controller_1.blogController.updateBlog);
router.delete("/:id", blog_controller_1.blogController.deletedBlog);
exports.blogRoutes = router;
