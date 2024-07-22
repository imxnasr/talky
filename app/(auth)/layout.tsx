import { Or, SocialAuthBtn } from "@/components";
import { ReactNode } from "react";

export default ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="size-full flex justify-center items-center">
      <div className="bg-slate rounded-xl p-6 !min-w-80 w-[600px] m-4">
        {children}
        <Or />
        <SocialAuthBtn />
      </div>
    </div>
  );
};
