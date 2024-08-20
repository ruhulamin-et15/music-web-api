"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
const auth_1 = __importDefault(require("../middleware/auth"));
const user_validation_1 = require("./user.validation");
const auth_validation_1 = require("../modules/auth/auth.validation");
const router = express_1.default.Router();
// register user
router.post("/register", (0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), user_controller_1.UserControllers.createUser);
// login user
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), user_controller_1.UserControllers.loginUser);
// change user password
//TODO: validate auth()
router.post("/change-password", (0, auth_1.default)("user"), (0, validateRequest_1.default)(user_validation_1.UserValidation.changePasswordValidationSchema), user_controller_1.UserControllers.changePassword);
exports.UserRoutes = router;
