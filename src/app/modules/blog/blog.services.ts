import { TBlog } from "./blog.interface";
import { BLog } from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await BLog.create(payload);
  return result;
};

const getBlogsIntoDB = async () => {
  const result = await BLog.find().populate("blogWriter");
  return result;
};

const getSingleBlogIntoDB = async (id: string) => {
  const result = await BLog.findById(id);
  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const updatedData = await BLog.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedData;
};

const deleteBlogIntoDB = async (id: string) => {
  const result = await BLog.findByIdAndDelete(id);
  return result;
};

export const blogService = {
  createBlogIntoDB,
  getBlogsIntoDB,
  updateBlogIntoDB,
  getSingleBlogIntoDB,
  deleteBlogIntoDB,
};
