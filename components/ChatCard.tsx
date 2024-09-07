"use client";

import { FC } from "react";
import { Avatar } from "@/components";
import { useSession } from "next-auth/react";

interface ChatCardProps {
  selected?: boolean;
}

export const ChatCard: FC<ChatCardProps> = ({ selected = false }) => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className={`w-full my-2 flex cursor-pointer p-3 rounded-2xl gap-2 ${selected && "bg-slateSecondary"}`}>
      {/* Avatar */}
      <Avatar />
      {/* Texts */}
      <div>
        <h4 className="mt-1">John Smith</h4>
        <p className="text-colorSecondary">How are you today?</p>
      </div>
      {/* Info */}
      <div className="flex flex-col">
        {/* Time */}
        <p className="text-colorSecondary text-sm">4m</p>
      </div>
    </div>
  );
};
