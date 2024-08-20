"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../../user/user.model");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, ` User not found `);
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is deleted");
    }
    // Compare the provided password
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid password");
    }
    const jwtPayload = {
        _id: user._id,
        username: user === null || user === void 0 ? void 0 : user.username,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const returnUser = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        username: user === null || user === void 0 ? void 0 : user.username,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    // generate access token
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.expires_times,
    });
    return {
        user: returnUser,
        token,
    };
});
// const changePassword = async (
//   userData: JwtPayload,
//   payload: { oldPassword: string; newPassword: string }
// ) => {
//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(userData.userId);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted;
//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
//   }
//   // checking if the user is blocked
//   const userStatus = user?.status;
//   if (userStatus === "blocked") {
//     throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
//   }
//   //checking if the password is correct
//   if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
//     throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds)
//   );
//   await UserModel.findOneAndUpdate(
//     {
//       id: userData.userId,
//       role: userData.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangedAt: new Date(),
//     }
//   );
//   return null;
// };
// const refreshToken = async (token: string) => {
//   // checking if the given token is valid
//   const decoded = jwt.verify(
//     token,
//     config.jwt_refresh_secret as string
//   ) as JwtPayload;
//   const { userId, iat } = decoded;
//   // checking if the user is exist
//   const user = await UserModel.isUserExistsByCustomId(userId);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted;
//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
//   }
//   // checking if the user is blocked
//   const userStatus = user?.status;
//   if (userStatus === "blocked") {
//     throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
//   }
//   if (
//     user.passwordChangedAt &&
//     User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
//   ) {
//     throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
//   }
//   const jwtPayload = {
//     userId: user.id,
//     role: user.role,
//   };
//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string
//   );
//   return {
//     accessToken,
//   };
// };
exports.AuthServices = {
    loginUser,
};
