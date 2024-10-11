import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useOutlet, useParams, useSearchParams } from "@remix-run/react";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { ChatCard, ChatCardLoader, Input, Search } from "~/components";
import { useFetch } from "~/hooks";
import { getSession } from "~/sessions";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const allowedTypes = ["chats", "groups", "search"];
  if (!allowedTypes.includes(params.type as string)) return redirect("/chats");
  const q = new URL(request.url).searchParams.get("q");
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("id");
};

export default () => {
  const userId = useLoaderData<typeof loader>();
  const outlet = useOutlet();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");
  const debouncedQ = useDebounce(q, 500);
  const url = `${params.type === "search" ? "/api/search?q=" + debouncedQ : "/api/chats?type=" + params.type}&userId=${userId}`;
  const { data, error, loading } = useFetch(url);
  useEffect(() => {
    if (params.type !== "search") return;
    setSearchParams(
      (prev) => {
        prev.set("q", debouncedQ);
        return prev;
      },
      { preventScrollReset: true }
    );
  }, [debouncedQ]);
  useEffect(() => {
    if (params.type !== "search") return;
    if (searchParams.get("q") === q) return;
    setQ(searchParams.get("q") || "");
  }, [searchParams]);
  return (
    <main className="flex flex-1">
      {/* Chats Section */}
      {params.type !== "search" ? (
        <section className="flex flex-col w-80 mr-10 overflow-auto">
          <Search />
          {loading ? (
            <ChatCardLoader />
          ) : data?.chats?.length > 0 ? (
            data?.chats.map((chat: any, index: number) => (
              <Link to={`/${params.type}/${chat.id}`} key={index}>
                <ChatCard name={chat.isGroup ? (chat.name as string) : chat.users[0].name} message={chat.messages[0]} selected={params.id === chat.id} />
              </Link>
            ))
          ) : (
            <p className="text-colorSecondary text-center mt-4">No chats yet</p>
          )}
        </section>
      ) : (
        <div className="flex-1">
          <Input type="text" name="search" id="search" placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} noLabel />
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : data?.users?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {data?.users.map((user: any, index: number) => (
                <div key={index} className="flex gap-4 items-center">
                  <img className="w-12 h-12 rounded-full" src={user.avatar || "avatar.jpg"} alt={user.name} />
                  <p>{user.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">No results found</div>
          )}
        </div>
      )}
      <h1 className="text-colorSecondary text-center mt-10 mb-4">{params.type !== "search" && !outlet ? "Select a chat" : ""}</h1>
      <Outlet />
    </main>
  );
};
