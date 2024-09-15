import { FC } from "react";

interface AvatarProps {
  placeholder?: boolean; // If true it buts the Avatar but without image
  twSize?: 12 | 14 | 16 | 20;
}

export const Avatar: FC<AvatarProps> = ({ placeholder, twSize = 16 }) => {
  return (
    <div className={`size-${twSize} rounded-2xl overflow-hidden`}>
      {!placeholder && <img className="size-full" src="./avatar.jpg" alt="chat-image-alt" />}
      {/* Dummy Divs */}
      <div className="hidden size-12" />
      <div className="hidden size-14" />
      <div className="hidden size-16" />
      <div className="hidden size-20" />
    </div>
  );
};
