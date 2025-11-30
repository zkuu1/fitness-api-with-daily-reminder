import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { authMiddleware } from "../../middlewares/auth-middleware";
import { 
  createUserResponse,
  getAllUserResponse,
  loginUserResponse,
  registerUserResponse
} from "../../controllers/users-controller";
import { loginUserSchema } from "../../validations/user-validation";

export const userApi = new Elysia({ prefix: "/users" })
  .use(jwt({
    secret: process.env.JWT_SECRET!,
    name: "jwt",
    exp: "7d"
  }))

  // Public
  .post("/register", ({ body }) => registerUserResponse(body))
  .post("/login", (ctx) => {
    const payload = loginUserSchema.parse(ctx.body);
    return loginUserResponse({
      jwt: ctx.jwt,
      ...payload
    });
  })

  // Protected
  .guard(
    { beforeHandle: authMiddleware },
    (app) =>
      app
        .post("/", ({ body }) => createUserResponse(body))
        .get("/", () => getAllUserResponse())
  );
