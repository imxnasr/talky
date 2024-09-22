import { FC } from "react";

interface ChatCardLoaderProps {}

export const ChatCardLoader: FC<ChatCardLoaderProps> = () => {
  return (
    <div className="w-full my-2 flex p-3 rounded-2xl gap-2 bg-slateSecondary animate-pulse">
      {/* Avatar */}
      <div className="size-16 bg-slateThird rounded-2xl" />
      {/* Lines */}
      <div className="flex-1 flex flex-col gap-1 justify-between">
        {/* Name & Time */}
        <div className="flex justify-between items-center">
          <div className="mt-1 h-4 w-1/2 bg-slateThird rounded" />
          <div className="mt-1 h-4 w-1/3 bg-slateThird rounded" />
        </div>
        {/* Message */}
        <div className="mb-3 h-4 bg-slateThird rounded w-3/4" />
      </div>
    </div>
  );
};
