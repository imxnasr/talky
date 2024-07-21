import Link from "next/link";
import { FC, ReactNode } from "react";
import { IoChatbubbles } from "react-icons/io5";
import { MdGroups } from "react-icons/md";

interface LinkIconProps {
  children: ReactNode;
  href: string;
}

const LinkIcon: FC<LinkIconProps> = ({ children, href }) => {
  return (
    <Link href={href} className="flex flex-col items-center text-center">
      {children}
    </Link>
  );
};

const size = 30;

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  return (
    <nav className="h-screen w-28 flex flex-col items-center py-6 px-4 gap-10">
      <LinkIcon href="/chats">
        <IoChatbubbles size={size} />
        All Chats
      </LinkIcon>
      <LinkIcon href="/groups">
        <MdGroups size={size} />
        Groups
      </LinkIcon>
    </nav>
  );
};
