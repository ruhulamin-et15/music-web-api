import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogService } from "./blog.services";

const createBlog = catchAsync(async (req, res) => {
  const result = await blogService.createBlogIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "blog created successfully",
    data: result,
  });
});

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getBlogsIntoDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "blogs retrived successfully",
    data: blogs,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blog = await blogService.getSingleBlogIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "blog retrived successfully",
    data: blog,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const updatedBlog = await blogService.updateBlogIntoDB(id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "blog updated successfully",
    data: updatedBlog,
  });
});

const deletedBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedBlog = await blogService.deleteBlogIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "blog deleted successfully",
    data: updatedBlog,
  });
});

export const blogController = {
  createBlog,
  getBlogs,
  updateBlog,
  getSingleBlog,
  deletedBlog,
};
