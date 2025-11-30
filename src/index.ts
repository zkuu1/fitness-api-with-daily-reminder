import 'dotenv/config';
import { Elysia } from "elysia";
import { userApi } from "./routes/public/api";
import jwt from "@elysiajs/jwt";

const app = new Elysia({ prefix: "/api" }) // Prefix global API di sini
    .use(jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET!
    }))
    .use(userApi) // /api/users
    .get("/", () => ({ message: "API Running..." })) // JSON Response

// Logging untuk memastikan env loaded
console.log("JWT SECRET LOADED:", process.env.JWT_SECRET);

// Start server
app.listen(3000);
console.log("🚀 Server running on http://localhost:3000/api/users");
