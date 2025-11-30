import { prisma } from "../../utils/prisma";
import bcrypt from "bcryptjs";
import { registerUserSchema } from "../../validations/user-validation";
import { ApiError } from "../../utils/api-error";


export const registerUser = async(payload:any) => {
    const user = await registerUserSchema.parseAsync(payload)
    const register = await prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            password: await bcrypt.hash(user.password, 10),
        },
        select: {
            name: true,
            email: true,
            password: true
        }
    })
    return register
}