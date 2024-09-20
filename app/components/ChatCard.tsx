import { FC } from "react";
import { Avatar } from "~/components";
import { timeDifferenceFromNow } from "~/utils/functions";

interface ChatCardProps {
  name: string;
  message: {
    body: string | null;
    image: string | null;
    createdAt: Date | string;
  };
  selected?: boolean;
}

export const ChatCard: FC<ChatCardProps> = ({ name, message, selected = false }) => {
  return (
    <div className={`w-full my-2 flex cursor-pointer p-3 rounded-2xl gap-2 ${selected && "bg-slateSecondary"}`}>
      {/* Avatar */}
      <Avatar />
      {/* Lines */}
      <div className="flex-1 flex flex-col gap-1">
        {/* First Line */}
        <div className="flex justify-between items-center">
          <h4 className="mt-1">{name}</h4>
          <p className="text-colorSecondary text-sm">{timeDifferenceFromNow(message.createdAt)}</p>
        </div>
        {/* Second Line */}
        <div className="flex flex-col">
          <p className="text-colorSecondary line-clamp-1">{message.body}</p>
        </div>
      </div>
    </div>
  );
};
