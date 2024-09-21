import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useOutlet, useParams } from "@remix-run/react";
import { ChatCard, Search } from "~/components";
import { getSession } from "~/sessions";
import prisma from "~/utils/prisma";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const allowedTypes = ["chats", "groups"];
  if (!allowedTypes.includes(params.type as string)) {
    return redirect("/chats");
  }
  const session = await getSession(request.headers.get("Cookie"));
  const user = await prisma.user.findUnique({
    where: { id: session.get("id") },
    select: {
      // Get all chats the user is part of
      chats: {
        where:
          params.type === "groups"
            ? {
                isGroup: true,
              }
            : {},
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
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  });
  const chats = user?.chats || [];
  return { chats };
};

export default () => {
  const data = useLoaderData<typeof loader>();
  const outlet = useOutlet();
  const params = useParams();
  const chats = data.chats;
  return (
    <main className="flex flex-1">
      {/* Chats Section */}
      <section className="flex flex-col w-80 mr-10 overflow-auto">
        <Search />
        {chats.length > 0 ? (
          chats.map((chat: (typeof chats)[0], index: number) => (
            <Link to={`/${params.type}/${chat.id}`}>
              <ChatCard key={index} name={chat.isGroup ? (chat.name as string) : chat.users[0].name} message={chat.messages[0]} selected={params.id === chat.id} />
            </Link>
          ))
        ) : (
          <p className="text-colorSecondary text-center mt-4">No chats yet</p>
        )}
      </section>
      {/* Messaging Section */}
      <h1 className="text-colorSecondary text-center mt-10 mb-4">{!outlet ? "Select a chat" : ""}</h1>
      <Outlet />
    </main>
  );
};
