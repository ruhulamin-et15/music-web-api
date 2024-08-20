"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = exports.categoryValidationSchema = void 0;
const zod_1 = require("zod");
// Define the Zod schema
exports.categoryValidationSchema = zod_1.z.object({
    CategoryName: zod_1.z.string().nonempty({ message: "Category Name is required" }),
});
exports.categoryValidation = {
    categoryValidationSchema: exports.categoryValidationSchema,
};
