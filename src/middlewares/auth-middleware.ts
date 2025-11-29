import { Context } from "elysia";
import jwt from "@elysiajs/jwt";

export const authMiddleware = async (ctx: Context & { jwt: any; user?: any }) => {
    const authHeader = ctx.request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        ctx.set.status = 401;
        return { error: "Unauthorized: Token required" };
    }

    const token = authHeader.split(" ")[1];
    const payload = await ctx.jwt.verify(token);

    if (!payload) {
        ctx.set.status = 403;
        return { error: "Forbidden: Invalid token" };
    }

    ctx.user = payload; // simpan info user
};
