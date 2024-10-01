import { apiPageSize, ApiQueryArgs } from "@/models/api-request";
import prisma from "@/services/prisma.client";

export type CategoryModel = Awaited<ReturnType<typeof queryCategory>>;
export type CategoryThreadModel = CategoryModel["threads"][number];
export const queryCategory = async (categoryId: string, args?: ApiQueryArgs) =>
  await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId,
    },
    include: {
      _count: {
        select: {
          threads: true,
        },
      },
      threads: {
        take: args?.take || apiPageSize,
        skip: args?.skip || 0,
        orderBy: {
          createdAt: "desc",
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
              createdAt: "desc",
            },
            include: {
              user: {
                select: {
                  username: true,
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });
