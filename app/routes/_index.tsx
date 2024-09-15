import { LoaderFunctionArgs, redirect } from "@remix-run/node";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return redirect("/login");
};
