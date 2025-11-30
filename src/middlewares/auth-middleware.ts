import { Context } from "elysia";

export const authMiddleware = async (ctx: Context & { jwt: any; user?: any }) => {
    const token = ctx.request.headers.get("authorization")?.trim();

    if (!token) {
        return new Response(
            JSON.stringify({ message: "Unauthorized: Token required" }),
            { status: 401 }
        );
    }

    const payload = await ctx.jwt.verify(token);

    if (!payload) {
        return new Response(
            JSON.stringify({ message: "Forbidden: Invalid token" }),
            { status: 403 }
        );
    }

    ctx.user = payload;
};
