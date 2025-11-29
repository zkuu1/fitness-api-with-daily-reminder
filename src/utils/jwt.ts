import jwt from "@elysiajs/jwt";

export const jwtConfig = jwt({
    secret: process.env.JWT_SECRET || "super_secret_key",
    exp: "3d" 
});
