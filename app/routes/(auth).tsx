import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Or, SocialAuthBtn } from "~/components";
import { getSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("id")) return redirect("/chats");
  return null;
};

export default () => {
  return (
    <div className="size-full flex justify-center items-center">
      <div className="bg-slate rounded-xl p-6 !min-w-80 w-[600px] m-4">
        <Outlet />
        <Or />
        <SocialAuthBtn />
      </div>
    </div>
  );
};
