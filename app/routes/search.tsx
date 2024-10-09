import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { Input } from "~/components";
import { useFetch } from "~/hooks";
import { getSession } from "~/sessions";
import prisma from "~/utils/prisma";

export const getUsers = async (q: string) => {
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: q,
      },
    },
  });
  return users;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("id")) return redirect("/chats");
  const { searchParams } = new URL(request.url);
  return { userId: session.get("id"), query: searchParams.get("q") as string };
};

export default () => {
  const navigate = useNavigate();
  const { userId, query } = useLoaderData<typeof loader>();
  const [q, setQ] = useState(query);
  const debouncedQ = useDebounce(q, 500);
  const { data, error, loading } = useFetch(`/api/search?userId=${userId}&q=${debouncedQ}`);
  useEffect(() => {
    navigate(`/search?q=${q}`);
  }, [debouncedQ]);
  return (
    <div>
      <Input type="text" name="search" id="search" placeholder="Search..." onChange={(e) => setQ(e.target.value)} />
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
