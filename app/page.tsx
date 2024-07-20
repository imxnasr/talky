import { ChatCard, Search } from "@/components";

export default () => {
  return (
    <main className="flex">
      {/* Chats Section */}
      <section className="flex flex-col min-w-64 overflow-auto">
        <Search />
        <ChatCard />
        <ChatCard selected />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </section>
    </main>
  );
};
