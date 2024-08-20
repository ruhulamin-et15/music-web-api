import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

// Define the schema
const blogSchema = new Schema<TBlog>({
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
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Create the model
export const BLog = model<TBlog>("Blog", blogSchema);
