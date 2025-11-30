import { prisma } from "../../utils/prisma";
import bcrypt from "bcryptjs";
import { loginUserSchema } from "../../validations/user-validation";
import { ApiError } from "../../utils/api-error";

export const loginUser = async (payload: any) => {
    const data = await loginUserSchema.parseAsync(payload);

    const user = await prisma.users.findUnique({
        where: {
            email: data.email
        }
    });

    if (!user) {
        throw new ApiError(401, "Email not registered");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    // Generate JWT
    const token = await payload.jwt.sign({
        id_user: user.id_user,
        email: user.email,
        role: user.role
    });

    return {
        user: {
            id_user: user.id_user,
            email: user.email,
            role: user.role
        },
        token
    };
};
