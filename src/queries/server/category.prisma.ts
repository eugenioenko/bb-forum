import prisma from "@/services/prisma.client";

export type CategoryModel = Awaited<ReturnType<typeof queryCategory>>;
export const queryCategory = async (categoryId: string) =>
  await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId,
    },
    include: {
      threads: {
        take: 10,
        orderBy: {
          createdAt: "asc",
        },
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
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
  });
