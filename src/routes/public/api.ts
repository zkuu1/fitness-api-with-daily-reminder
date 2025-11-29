import { Elysia } from "elysia";
import { getAllUserResponse } from "../../controllers/users-controller";
import { createUserResponse } from "../../controllers/users-controller";

export const userApi = new Elysia({ prefix: "/api" })
  .post("/", async ({ body }) => createUserResponse(body))
  .get("/users", async () => getAllUserResponse());
