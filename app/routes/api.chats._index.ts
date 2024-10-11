import { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "~/utils/prisma";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const type = searchParams.get("type");
  if (!userId) {
    return [];
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      // Get all chats the user is part of
      chats: {
        where:
          type === "groups"
            ? {
                isGroup: true,
              }
            : {},
        include: {
          users: {
            // Get all users in the chat except the current user
            where: {
              id: { not: userId },
            },
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true,
            },
          },
          // Get the last message in each chat
          messages: {
            select: {
              body: true,
              image: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  });
  return new Response(JSON.stringify({ chats: user?.chats || [] }));
};
