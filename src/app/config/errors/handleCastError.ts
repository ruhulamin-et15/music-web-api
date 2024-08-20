import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: err.path || "",
      message: `${err.value._id} is not a valid ID!`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};
export default handleCastError;
