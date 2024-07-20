import { FC } from "react";

interface ChatCardProps {
  selected?: boolean;
}

export const ChatCard: FC<ChatCardProps> = ({ selected = false }) => {
  return (
    <div className={`w-full my-2 flex cursor-pointer p-3 rounded-2xl ${selected && "bg-slateSecondary"}`}>
      {/* Image Container */}
      <div className="size-16 rounded-2xl overflow-hidden mr-2">
        <img className="size-full" src="./avatar.jpg" alt="chat-image-alt" />
      </div>
      {/* Texts */}
      <div>
        <h4 className="text-color mt-1">John Smith</h4>
        <p className="text-colorSecondary">How are you today?</p>
      </div>
      {/* Info */}
      <div className="flex flex-col ml-2">
        {/* Time */}
        <p className="text-colorSecondary text-sm">4m</p>
      </div>
    </div>
  );
};
