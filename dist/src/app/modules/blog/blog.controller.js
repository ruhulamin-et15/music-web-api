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
exports.blogController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blog_services_1 = require("./blog.services");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_services_1.blogService.createBlogIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "blog created successfully",
        data: result,
    });
}));
const getBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_services_1.blogService.getBlogsIntoDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "blogs retrived successfully",
        data: blogs,
    });
}));
const getSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const blog = yield blog_services_1.blogService.getSingleBlogIntoDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "blog retrived successfully",
        data: blog,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const updatedBlog = yield blog_services_1.blogService.updateBlogIntoDB(id, updateData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "blog updated successfully",
        data: updatedBlog,
    });
}));
const deletedBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedBlog = yield blog_services_1.blogService.deleteBlogIntoDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "blog deleted successfully",
        data: updatedBlog,
    });
}));
exports.blogController = {
    createBlog,
    getBlogs,
    updateBlog,
    getSingleBlog,
    deletedBlog,
};
