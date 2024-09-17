import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("id")) return redirect("/chats");
  else return redirect("/login");
};
