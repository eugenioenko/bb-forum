import prisma from "@/services/prisma.client";

export type UpdatePostModel = Awaited<ReturnType<typeof queryPost>>;
export const queryPost = async (postId: string) =>
  await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
    select: {
      id: true,
      threadId: true,
      content: true,
      title: true,
    },
  });
