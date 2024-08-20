"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    email: zod_1.z
        .string({ required_error: "email is required" })
        .email("Invalid email format"),
    password: zod_1.z.string({ required_error: "password is required" }),
});
exports.AuthValidation = {
    loginValidationSchema,
};
