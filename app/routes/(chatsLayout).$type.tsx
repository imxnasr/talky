import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useOutlet, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ChatCard, ChatCardLoader, Search } from "~/components";
import { getSession } from "~/sessions";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const allowedTypes = ["chats", "groups"];
  if (!allowedTypes.includes(params.type as string)) {
    return redirect("/chats");
  }
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("id");
};

export default () => {
  const userId = useLoaderData<typeof loader>();
  const outlet = useOutlet();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    setIsLoading(true);
    const res = await fetch("/api/chats?type=" + params.type + "&id=" + userId);
    const data = await res.json();
    setChats(data.chats);
    setIsLoading(false);
  };
  useEffect(() => {
    getChats();
  }, [params.type]);

  return (
    <main className="flex flex-1">
      {/* Chats Section */}
      <section className="flex flex-col w-80 mr-10 overflow-auto">
        <Search />
        {isLoading ? (
          <ChatCardLoader />
        ) : chats.length > 0 ? (
          chats.map((chat: any, index: number) => (
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
