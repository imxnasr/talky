import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Chat, ChatCard, Search } from "~/components";
import { getSession } from "~/sessions";
import prisma from "~/utils/prisma";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = await prisma.user.findUnique({
    where: { username: session.get("username") },
    include: { chats: true },
  });
  console.log(user?.chats);
  return user?.chats;
};

export default () => {
  const data = useLoaderData<typeof loader>();
  return (
    <main className="flex flex-1">
      {/* Chats Section */}
      <section className="flex flex-col min-w-64 mr-10 overflow-auto">
        <Search />
        {data.map((chat: any) => (
          <ChatCard key={chat.id} {...chat} />
        ))}
      </section>
      {/* Messaging Section */}
      <Chat />
    </main>
  );
};
