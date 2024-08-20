import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import { TLoginUser } from "./auth.interface";
import { UserModel } from "../../user/user.model";
import AppError from "../../utils/AppError";

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, ` User not found `);
  }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }

  // Compare the provided password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid password");
  }

  const jwtPayload = {
    _id: user._id,
    username: user?.username,
    email: user?.email,
    role: user?.role,
  };

  const returnUser = {
    _id: user?._id,
    username: user?.username,
    email: user?.email,
    role: user?.role,
  };

  // generate access token
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.expires_times,
  });

  return {
    user: returnUser,
    token,
  };
};

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

export const AuthServices = {
  loginUser,
};
