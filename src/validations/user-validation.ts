import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().max(100, "Name too long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(10, "Password must be at least 10 characters"),
  address: z.string().max(50).optional(),
  image: z.string().url("Invalid image URL").optional(),
  role: z.enum(["user", "admin"]).default("user")
});

export const registerUserSchema = z.object({
  name: z.string().max(100, "Name too long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(10, "Password must be at least 10 characters"),
})

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(10, "Password must be at least 10 characters"),
})

export const editUserSchema = z.object({
   name: z.string().max(100, "Name too long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(10, "Password must be at least 10 characters"),
  address: z.string().max(50).optional(),
  image: z.string().url("Invalid image URL").optional(),
  role: z.enum(["user", "admin"]).default("user")
})

export const deleteUserSchema = z.object({
    id: z.string()
})

export const searchUserSchema = z.object({
    id: z.string()
})

