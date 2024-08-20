"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../config/errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../config/errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../config/errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../config/errors/handleDuplicateError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "something went wrong";
    let errorSources = [
        {
            path: "",
            message: "something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const smiplifiedError = (0, handleZodError_1.default)(err);
        statusCode = smiplifiedError.statusCode;
        message = smiplifiedError.message;
        errorSources = smiplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const smiplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = smiplifiedError.statusCode;
        message = smiplifiedError.message;
        errorSources = smiplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const smiplifiedError = (0, handleCastError_1.default)(err);
        statusCode = smiplifiedError.statusCode;
        message = smiplifiedError.message;
        errorSources = smiplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const smiplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = smiplifiedError.statusCode;
        message = smiplifiedError.message;
        errorSources = smiplifiedError.errorSources;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage: err instanceof zod_1.ZodError
            ? errorSources
                .map((eSource) => `${eSource.path} is ${eSource.message}`)
                .join(".")
            : errorSources.map((eSource) => `${eSource.message}`).join("."),
        errorDetails: err || "Something went wrong",
        stack: config_1.default.NODE_ENV === "development" && "production" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
