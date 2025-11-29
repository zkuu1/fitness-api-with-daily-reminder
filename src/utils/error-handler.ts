import { ApiError } from "./api-error";

export const errorHandler = ({ error, set }: any) => {
  if (error instanceof ApiError) {
    set.status = error.statusCode;
    return {
      success: false,
      message: error.message
    };
  }

  set.status = 500;
  return {
    success: false,
    message: "Internal Server Error"
  };
};
