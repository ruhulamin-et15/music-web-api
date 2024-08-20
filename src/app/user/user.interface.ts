import { UserModel } from "./user.model";
import { Document, Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

// user interface
export interface TUser {
  username: string;
  email: string;
  password: string;
  contactNo: string;
  role: "admin" | "user";
  isDeleted: boolean;
  status: "blocked" | "active";
}

export type TLoginUser = {
  username: string;
  password: string;
};

export interface UserDocument extends Document, TUser {
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
}

export type PasswordHistory = {
  userId: Types.ObjectId;
  passwordHash: string;
  timestamp: Date;
};
export type TUserRole = keyof typeof USER_ROLE;
export interface TUserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExistsByCustomUserName(username: string): Promise<TUser>;
}
