import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useOutlet, useParams, useSearchParams } from "@remix-run/react";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { ChatCard, ChatCardLoader, Input, Search, SearchSection, SideChatsSection } from "~/components";
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
      {params.type !== "search" ? <SideChatsSection loading={loading} data={data} params={params} /> : <SearchSection loading={loading} data={data} q={q} setQ={setQ} />}
      <h1 className="text-colorSecondary text-center mt-10 mb-4">{params.type !== "search" && !outlet ? "Select a chat" : ""}</h1>
      <Outlet />
    </main>
  );
};
