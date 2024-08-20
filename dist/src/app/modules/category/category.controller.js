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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const category_services_1 = require("./category.services");
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_services_1.categoryServices.createCategoryIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Category created successfully",
        data: result,
    });
}));
const getCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_services_1.categoryServices.getCategoriesIntoDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Categories retrived successfully",
        data: result,
    });
}));
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const updatedData = yield category_services_1.categoryServices.updateCategoryIntoDB(id, updateData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Category updated successfully",
        data: updatedData,
    });
}));
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedData = yield category_services_1.categoryServices.deleteCategoryIntoDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Category deleted successfully",
        data: deletedData,
    });
}));
exports.categoryController = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};
