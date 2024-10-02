import { apiPageSize, ApiQueryArgs } from "@/models/api-request";
import prisma from "@/services/prisma.client";

export type ThreadModel = Awaited<ReturnType<typeof queryThread>>;
export type ThreadPostModel = ThreadModel["posts"][number];
export type PostUser = ThreadPostModel["user"];
export const queryThread = async (categoryId: string, args?: ApiQueryArgs) =>
  await prisma.thread.findUniqueOrThrow({
    where: {
      id: categoryId,
    },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      posts: {
        take: args?.take || apiPageSize,
        skip: args?.skip || 0,
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              createdAt: true,
            },
          },
        },
      },
    },
  });
