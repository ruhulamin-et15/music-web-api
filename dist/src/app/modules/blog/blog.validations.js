"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = exports.blogValidationSchema = void 0;
const zod_1 = require("zod");
// Define the Zod schema
exports.blogValidationSchema = zod_1.z.object({
    blogTitle: zod_1.z.string().nonempty({ message: "blogTitle is required" }),
    blogImage: zod_1.z.string().nonempty({ message: "blogImage is required" }),
    blogType: zod_1.z.string().nonempty({ message: "blogType is required" }),
    shortDescription: zod_1.z
        .string()
        .nonempty({ message: "shortDescription is required" }),
    blogDescription: zod_1.z
        .string()
        .nonempty({ message: "blogDescription is required" }),
});
exports.blogValidation = {
    blogValidationSchema: exports.blogValidationSchema,
};
