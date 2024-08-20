"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(category_validation_1.categoryValidation.categoryValidationSchema), category_controller_1.categoryController.createCategory);
router.get("/", category_controller_1.categoryController.getCategories);
router.put("/:id", category_controller_1.categoryController.updateCategory);
router.delete("/:id", category_controller_1.categoryController.deleteCategory);
exports.categoryRoutes = router;
