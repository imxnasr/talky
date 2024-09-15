import { Chat, ChatCard, Search } from "~/components";

export default () => {
  const data = [{}];
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
        {/* {data.map((chat: any) => (
          <ChatCard key={chat.id} {...chat} />
        ))} */}
      </section>
      {/* Messaging Section */}
      <Chat />
    </main>
  );
};
