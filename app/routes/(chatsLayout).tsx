import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Navbar } from "~/components";
import { getSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("id")) return redirect("/login");
  return null;
};

export default () => {
  return (
    <div className="flex bg-gray">
      <Navbar />
      <main className="bg-slate rounded-3xl p-5 flex flex-1 h-screen">
        <Outlet />
      </main>
    </div>
  );
};
