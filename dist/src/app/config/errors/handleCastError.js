"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errorSources = [
        {
            path: err.path || "",
            message: `${err.value._id} is not a valid ID!`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Invalid ID",
        errorSources,
    };
};
exports.default = handleCastError;
