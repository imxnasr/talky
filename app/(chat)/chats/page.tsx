import { Chat, ChatCard, Search } from "@/components";

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
      <Chat />
    </main>
  );
};
