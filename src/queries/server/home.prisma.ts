import prisma from "@/services/prisma.client";

export type HomePageModel = Awaited<ReturnType<typeof queryHomePage>>;
export const queryHomePage = async () =>
  await prisma.section.findMany({
    include: {
      categories: {
        include: {
          _count: {
            select: {
              threads: true,
            },
          },
          threads: {
            take: 1,
            orderBy: {
              createdAt: "asc",
            },
            include: {
              posts: {
                take: 1,
                orderBy: {
                  createdAt: "asc",
                },
                include: {
                  user: {
                    select: {
                      username: true,
                      email: true,
                      id: true,
                      lastLogin: true,
                      createdAt: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
