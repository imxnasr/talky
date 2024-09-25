import { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "~/utils/prisma";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") as string;
  if (!userId) {
    return [];
  }
  const chat = await prisma.chat.findUnique({
    where: {
      id: params.id,
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
        where: {
          id: { not: userId },
        },
      },
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  if (!chat) return new Response(JSON.stringify({ error: "Chat not found" }));
  // return {
  //   chatName: chat.isGroup ? chat.name : chat.users.length > 0 ? chat.users[0].name : "",
  //   chatIsGroup: chat.isGroup,
  //   usersCount: chat.users.length + 1,
  //   messages: chat?.messages || [],
  // };
  return new Response(
    JSON.stringify({
      chatName: chat.isGroup ? chat.name : chat.users.length > 0 ? chat.users[0].name : "",
      chatIsGroup: chat.isGroup,
      usersCount: chat.users.length + 1,
      messages: chat?.messages || [],
    })
  );
};
