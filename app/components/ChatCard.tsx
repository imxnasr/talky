import { FC } from "react";
import { Avatar } from "~/components";

interface ChatCardProps {
  name: string;
  message: {
    body: string;
    image: string;
    createdAt: string;
  };
  selected?: boolean;
}

export const ChatCard: FC<ChatCardProps> = ({ name, message, selected = false }) => {
  return (
    <div className={`w-full my-2 flex cursor-pointer p-3 rounded-2xl gap-2 ${selected && "bg-slateSecondary"}`}>
      {/* Avatar */}
      <Avatar />
      {/* Texts */}
      <div>
        <h4 className="mt-1">{name}</h4>
        <p className="text-colorSecondary">{message.body}</p>
      </div>
      {/* Info */}
      <div className="flex flex-col">
        {/* Time */}
        <p className="text-colorSecondary text-sm">{message.createdAt}</p>
      </div>
    </div>
  );
};
