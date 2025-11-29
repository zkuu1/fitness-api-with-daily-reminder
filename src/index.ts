import { Elysia } from "elysia";
import { userApi } from "../src/routes/public/api";
import { errorHandler } from "./utils/error-handler";

const app = new Elysia()
    .get("/", () => "Server is running 🟢")
    .use(userApi)
    .onError(errorHandler)
    .listen(3000);

console.log(`🔥 Server running at http://localhost:3000`);
