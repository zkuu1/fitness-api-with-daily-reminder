import { createUser } from "../services/users/createUser";
import { getAllUser } from "../services/users/getAllUser";
import { ApiError } from "../utils/api-error";
import { loginUser } from "../services/users/loginUser";
import { registerUser } from "../services/users/registerUser";

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

export const loginUserResponse = async (payload: any) => {
  try {
    const { token, user } = await loginUser(payload);

    return {
      success: true,
      message: "Login successful",
      user,
      token
    };
  } catch (err: any) {
    throw new ApiError(401, err?.message || "Invalid email or password");
  }
};

export const registerUserResponse = async(payload: any) => {
  try {
    const response = await registerUser(payload);
    return {
      success: true,
      data: response
    }
  } catch (err: any) {
    throw new ApiError(401, err?.message || "Invalid email or password");
  }
}