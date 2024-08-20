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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const passwordHistory_model_1 = require("../modules/passwordHistory/passwordHistory.model");
const user_model_1 = require("../user/user.model");
const auth = (...requiredRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            // checking if the token is missing
            if (!token) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Unauthorized Access");
            }
            // checking if the given token is valid
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            const { role, _id, iat } = decoded;
            // check if the user exists
            const isUserExist = yield user_model_1.UserModel.findById(_id).select("-password");
            if (!isUserExist) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found ");
            }
            if (requiredRole && !requiredRole.includes(role)) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You are not authorized!");
            }
            let passwordChangedTime = null;
            const passwordChangeDate = yield passwordHistory_model_1.PasswordHistoryModel.findOne({
                userId: _id,
            });
            if (passwordChangeDate && passwordChangeDate.timestamp) {
                passwordChangedTime =
                    new Date(passwordChangeDate.timestamp).getTime() / 1000;
            }
            if (passwordChangedTime && iat && passwordChangedTime > iat) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
            }
            // setting user in request
            req.user = decoded;
            next();
        }
        catch (error) {
            const errorResponse = {
                success: false,
                message: "Unauthorized Access",
                errorMessage: "You do not have the necessary permissions to access this resource.",
                errorDetails: null,
                stack: null,
            };
            res.status(http_status_1.default.UNAUTHORIZED).json(errorResponse);
        }
    }));
};
exports.default = auth;
