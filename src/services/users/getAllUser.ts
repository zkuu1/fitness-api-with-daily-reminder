import { prisma } from "../../utils/prisma"

export const getAllUser = async () => {
  const users = await prisma.users.findMany({
    select: {
      id_user: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    }
  });

  return users;
};
