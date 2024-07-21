import { ReactNode } from "react";
import { Navbar } from "@/components";

export default ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <Navbar />
      <main className="bg-slate rounded-3xl p-5 flex flex-1">{children}</main>
    </>
  );
};
