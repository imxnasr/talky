import { FC } from "react";

interface SocialAuthBtnProps {}

export const SocialAuthBtn: FC<SocialAuthBtnProps> = () => {
  return (
    <button type="button" className="p-3 w-full h-12 bg-slateSecondary rounded-xl">
      <img src="./google-icon.svg" className="size-full" />
    </button>
  );
};
