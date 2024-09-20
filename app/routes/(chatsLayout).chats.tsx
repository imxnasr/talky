import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Chat, ChatCard, Search } from "~/components";
import { getSession } from "~/sessions";
import prisma from "~/utils/prisma";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = await prisma.user.findUnique({
    where: { id: session.get("id") },
    select: {
      // Get all chats the user is part of
      chats: {
        include: {
          users: {
            // Get all users in the chat except the current user
            where: {
              id: { not: session.get("id") },
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
      },
    },
  });
  const chats = user?.chats || [];
  return { chats };
};

export default () => {
  const data = useLoaderData<typeof loader>();
  const chats = data.chats;
  return (
    <main className="flex flex-1">
      {/* Chats Section */}
      <section className="flex flex-col min-w-64 mr-10 overflow-auto">
        <Search />
        {chats.length > 0 ? chats.map((chat: any, index: number) => <ChatCard key={index} name={chat.isGroup ? chat.name : chat.users[0].name} message={chat.messages[0]} />) : <p className="text-colorSecondary text-center mt-4">No chats yet</p>}
      </section>
      {/* Messaging Section */}
      <Chat />
    </main>
  );
};
