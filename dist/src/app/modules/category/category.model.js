"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
// Define the schema
const categorySchema = new mongoose_1.Schema({
    CategoryName: {
        type: String,
        required: [true, "Category Name is required"],
    },
});
// Create the model
exports.Category = (0, mongoose_1.model)("Category", categorySchema);
