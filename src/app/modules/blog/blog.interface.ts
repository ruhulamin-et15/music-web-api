import { ObjectId } from "mongoose";

export interface TBlog {
  blogTitle: string;
  blogImage: string;
  blogType: string;
  shortDescription: string;
  blogDescription: string;
  blogWriter: ObjectId;
}
