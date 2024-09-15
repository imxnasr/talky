import { FC } from "react";

interface OrProps {}

export const Or: FC<OrProps> = () => {
  return (
    <div className="flex items-center justify-center my-2">
      <div className="h-[1px] w-full bg-zinc-500/40" />
      <p className="text-zinc-500/70 mx-3">Or</p>
      <div className="h-[1px] w-full bg-zinc-500/40" />
    </div>
  );
};
