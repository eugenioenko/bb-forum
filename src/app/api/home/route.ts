import prisma from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const homePage = await prisma.section.findMany({
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

  return NextResponse.json({ data: homePage }, { status: 200 });
}
