import prisma from "@/services/prisma.client";

export type ProfileModel = Awaited<ReturnType<typeof queryProfile>>;
export const queryProfile = async (userId: string) =>
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      profile: {
        select: {
          bio: true,
        },
      },
      _count: {
        select: {
          threads: true,
          posts: true,
        },
      },
    },
  });
