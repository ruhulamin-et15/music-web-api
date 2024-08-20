"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.newPasswordValidationSchema = void 0;
const zod_1 = require("zod");
// user registration schema
const userValidationSchema = zod_1.z.object({
    username: zod_1.z.string().nonempty({ message: "Username is required" }),
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    password: zod_1.z
        .string({
        invalid_type_error: "Password must be a string",
    })
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password cannot be more than 20 characters long" })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long",
    }),
    contactNo: zod_1.z.string({ required_error: "Contact number is required" }),
    isDeleted: zod_1.z.boolean().optional(),
    role: zod_1.z.enum(["user", "admin"]).default("user"),
    status: zod_1.z.enum(["blocked", "active"]).default("active"),
});
//   login user validation schema
const loginUserValidationSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
// change password schema
const changePasswordValidationSchema = zod_1.z.object({
    currentPassword: zod_1.z.string({
        required_error: "Current password is required",
    }),
    newPassword: zod_1.z.string({ required_error: "new Password is required" }),
});
// new password validation shcema
exports.newPasswordValidationSchema = zod_1.z.object({
    newPassword: zod_1.z
        .string({
        invalid_type_error: "Password must be a string",
    })
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password cannot be more than 20 characters long" })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long",
    }),
});
exports.UserValidation = {
    userValidationSchema,
    loginUserValidationSchema,
    changePasswordValidationSchema,
    newPasswordValidationSchema: exports.newPasswordValidationSchema,
};
