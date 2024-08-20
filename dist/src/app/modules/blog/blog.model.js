"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLog = void 0;
const mongoose_1 = require("mongoose");
// Define the schema
const blogSchema = new mongoose_1.Schema({
    blogTitle: {
        type: String,
        required: [true, "blogTitle is required"],
    },
    blogImage: {
        type: String,
        required: [true, "blogImage is required"],
    },
    blogType: {
        type: String,
        required: [true, "blogType is required"],
    },
    shortDescription: {
        type: String,
        required: [true, "shortDescription is required"],
    },
    blogDescription: {
        type: String,
        required: [true, "blogDescription is required"],
    },
    blogWriter: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});
// Create the model
exports.BLog = (0, mongoose_1.model)("Blog", blogSchema);
