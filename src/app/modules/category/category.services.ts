import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getCategoriesIntoDB = async () => {
  const result = await Category.find();
  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>
) => {
  const updatedData = await Category.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedData;
};

const deleteCategoryIntoDB = async (id: string) => {
  const deletedData = await Category.findByIdAndDelete(id);
  return deletedData;
};

export const categoryServices = {
  createCategoryIntoDB,
  getCategoriesIntoDB,
  updateCategoryIntoDB,
  deleteCategoryIntoDB,
};
