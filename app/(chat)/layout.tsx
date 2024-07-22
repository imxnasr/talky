import { ReactNode } from "react";
import { Navbar } from "@/components";

export default ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="flex">
      <Navbar />
      <main className="bg-slate rounded-3xl p-5 flex flex-1 h-screen">{children}</main>
    </div>
  );
};
