import { createUserSchema } from "../../validations/user-validation";
import { prisma } from "../../utils/prisma"

export const createUser = async (payload: unknown) => {
  const data = createUserSchema.parse(payload); 
  return prisma.users.create({
    data,
    select: {
      id_user: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    }
  });
};
