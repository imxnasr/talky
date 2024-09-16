import { Outlet, useLoaderData } from "@remix-run/react";
import { Navbar } from "~/components";
import bcrypt from "bcrypt";

export const loader = async () => {
  const hashed = await bcrypt.hash("imx", 12);
  const test = await bcrypt.compare("imx", hashed);
  return hashed;
};

export default () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex bg-gray">
      <Navbar />
      <main className="bg-slate rounded-3xl p-5 flex flex-1 h-screen">
        <h1 className="text-sm">{data}</h1>
        {/* <h1 className="text-sm">{data ? "true" : "false"}</h1> */}
        <Outlet />
      </main>
    </div>
  );
};
