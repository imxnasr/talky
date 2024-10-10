import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { Input } from "~/components";
import { useFetch } from "~/hooks";
import { getSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("id")) return redirect("/chats");
  return { userId: session.get("id") };
};

export default () => {
  const { userId } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");
  const debouncedQ = useDebounce(q, 500);
  const { data, error, loading } = useFetch(`/api/search?userId=${userId}&q=${debouncedQ}`);
  useEffect(() => {
    setSearchParams(
      (prev) => {
        prev.set("q", debouncedQ);
        return prev;
      },
      { preventScrollReset: true }
    );
  }, [debouncedQ]);
  return (
    <div>
      <Input type="text" name="search" id="search" placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
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
  );
};
