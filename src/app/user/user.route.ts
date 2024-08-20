import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../middleware/validateRequest";

import auth from "../middleware/auth";
import { UserValidation } from "./user.validation";
import { AuthValidation } from "../modules/auth/auth.validation";

const router = express.Router();

// register user
router.post(
  "/register",
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);
// login user
router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  UserControllers.loginUser
);

// change user password
//TODO: validate auth()
router.post(
  "/change-password",
  auth("user"),
  validateRequest(UserValidation.changePasswordValidationSchema),
  UserControllers.changePassword
);

export const UserRoutes = router;
