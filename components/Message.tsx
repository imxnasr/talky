import { FC } from "react";
import { Avatar } from "./Avatar";

interface MessageProps {
  me?: boolean;
  avatar?: boolean;
  message: string;
}

export const Message: FC<MessageProps> = ({ me, avatar, message }) => {
  return (
    <div className={`flex-1 flex items-end gap-x-2 ${me && "flex-row-reverse"} ${avatar && "mb-2"}`}>
      <Avatar placeholder={!avatar} twSize={14} />
      {/* Actual Message */}
      <div className={`${me ? "bg-primary" : "bg-slateSecondary"} mt-1 p-4 rounded-2xl max-w-[70%]`}>
        <p>{message}</p>
      </div>
    </div>
  );
};
