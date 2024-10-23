import prisma from "@/services/prisma.client";

export type AuthUserQueryModel =
  | Awaited<ReturnType<typeof queryAuthUserById>>
  | Awaited<ReturnType<typeof queryAuthUserByEmail>>;

export const queryAuthUserById = async (id: string) =>
  await prisma.user.findUnique({
    include: {
      userRoles: true,
    },
    where: { id },
  });

export const queryAuthUserByEmail = async (email: string) =>
  await prisma.user.findUnique({
    include: {
      userRoles: true,
    },
    where: { email },
  });
