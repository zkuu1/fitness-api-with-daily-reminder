import { createUser } from "../services/users/createUser";
import { getAllUser } from "../services/users/getAllUser";
import { ApiError } from "../utils/api-error";

export const createUserResponse = async (payload: any) => {
  try {
    const response = await createUser(payload);
    return {
      success: true,
      data: response
    };
  } catch (err: any) {
    throw new ApiError(400, err?.message || "Failed to create user");
  }
};

export const getAllUserResponse = async () => {
  try {
    const response = await getAllUser();
    return {
      success: true,
      data: response
    };
  } catch (err: any) {
    throw new ApiError(500, "Failed to fetch users");
  }
};
