import { FC } from "react";
import { Search } from "./Search";
import { Link } from "@remix-run/react";
import { ChatCard, ChatCardLoader } from "./";

interface SideChatsSectionProps {
  loading: boolean;
  data: any;
  params: any;
}

export const SideChatsSection: FC<SideChatsSectionProps> = ({ loading, data, params }) => {
  return (
    <section className="flex flex-col w-80 mr-10 overflow-auto">
      <Search />
      {loading ? (
        <ChatCardLoader />
      ) : data?.chats?.length > 0 ? (
        data?.chats.map((chat: any, index: number) => (
          <Link to={`/${params.type}/${chat.id}`} key={index}>
            <ChatCard name={chat.isGroup ? (chat.name as string) : chat.users[0].name} message={chat.messages[0]} selected={params.id === chat.id} />
          </Link>
        ))
      ) : (
        <p className="text-colorSecondary text-center mt-4">No chats yet</p>
      )}
    </section>
  );
};
