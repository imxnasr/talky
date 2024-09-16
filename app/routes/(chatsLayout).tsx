import { Outlet } from "@remix-run/react";
import { Navbar } from "~/components";

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
