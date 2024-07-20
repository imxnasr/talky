import { ChatCard, Search } from "@/components";
import { FiSearch } from "react-icons/fi";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";

export default () => {
  return (
    <main className="flex flex-1">
      {/* Chats Section */}
      <section className="flex flex-col min-w-64 mr-10 overflow-auto">
        <Search />
        <ChatCard />
        <ChatCard selected />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </section>
      {/* Messaging Section */}
      <section className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between w-full">
          {/* Texts */}
          <div className="flex flex-col justify-between">
            <h1 className="text-color font-bold text-3xl">John Smith</h1>
            <p className="text-colorSecondary">45 members, 24 online</p>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4 text-colorSecondary">
            <FiSearch size={25} />
            <PiDotsThreeOutlineVertical size={25} />
          </div>
        </div>
      </section>
    </main>
  );
};
