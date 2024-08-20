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
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const config_1 = __importDefault(require("../config"));
const passwordHistory_model_1 = require("../modules/passwordHistory/passwordHistory.model");
const user_validation_1 = require("./user.validation");
// create user /register user
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.UserModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already exist");
    }
    const result = (yield user_model_1.UserModel.create(payload));
    if (!result) {
        throw new Error("not found");
    }
    // collecting password for history
    const PasswordHistorySave = yield passwordHistory_model_1.PasswordHistoryModel.create({
        userId: result === null || result === void 0 ? void 0 : result._id,
        passwordHash: result === null || result === void 0 ? void 0 : result.password,
        timestamp: Date.now(),
    });
    if (!PasswordHistorySave) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Something went wrong ");
    }
    const returnUser = {
        _id: result === null || result === void 0 ? void 0 : result._id,
        username: result === null || result === void 0 ? void 0 : result.username,
        email: result === null || result === void 0 ? void 0 : result.email,
        role: result === null || result === void 0 ? void 0 : result.role,
        createdAt: result === null || result === void 0 ? void 0 : result.createdAt,
        updatedAt: result === null || result === void 0 ? void 0 : result.updatedAt,
    };
    return returnUser;
});
// handle login
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = payload;
    const user = yield user_model_1.UserModel.findOne({ username });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, ` User not found `);
    }
    // Compare the provided password
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid password");
    }
    const jwtPayload = {
        _id: user._id,
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
        expiresIn: "30d",
    });
    return {
        user: returnUser,
        token,
    };
});
// change password
const changePasswordIntoDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // // Find the user by email in the database
    const user = yield user_model_1.UserModel.findOne({ _id: userData === null || userData === void 0 ? void 0 : userData._id });
    // // check the user is exist
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, ` User not found `);
    }
    //  Compare the provided password
    const passwordMatch = yield bcrypt_1.default.compare(payload.currentPassword, user.password);
    if (!passwordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid password");
    }
    // Check if the new password matches any of the previous 2 passwords or the current one
    const previousPasswords = yield passwordHistory_model_1.PasswordHistoryModel.find({
        userId: user._id,
    })
        .sort({ timestamp: -1 })
        .limit(2);
    // checking is password is match last two password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const isPasswordRepeated = previousPasswords.some((prevPassword) => {
        const isMatch = bcrypt_1.default.compareSync(payload.newPassword, prevPassword.passwordHash);
        if (isMatch) {
            const formattedTimestamp = prevPassword.timestamp.toLocaleString();
            throw new Error(`Password change failed. Ensure the new password is unique and not among the last 2 used and current one  (last used on ${formattedTimestamp}).`);
        }
        return isMatch;
    });
    //  current one password checking is match
    if (payload.currentPassword === payload.newPassword) {
        throw new Error("Password change failed. Ensure the new password is unique and not among the last 2 used and current one");
    }
    user_validation_1.newPasswordValidationSchema.parse({ newPassword: payload.newPassword });
    //  hashing new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_url));
    const result = yield user_model_1.UserModel.findOneAndUpdate({ _id: user === null || user === void 0 ? void 0 : user._id, email: user === null || user === void 0 ? void 0 : user.email, role: user === null || user === void 0 ? void 0 : user.role }, { password: newHashedPassword }, { new: true }).select("-password");
    // // collecting password for history
    yield passwordHistory_model_1.PasswordHistoryModel.create({
        userId: user === null || user === void 0 ? void 0 : user._id,
        passwordHash: user === null || user === void 0 ? void 0 : user.password,
        timestamp: Date.now(),
    });
    return result;
});
exports.UserService = {
    createUserIntoDB,
    loginUser,
    changePasswordIntoDB,
};
