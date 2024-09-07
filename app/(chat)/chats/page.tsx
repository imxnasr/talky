import { Chat, ChatCard, Search } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async () => {
  const session = await getServerSession();
  if (!session) return redirect("/login");
  // console.log(session);
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations?forUser=${session.user._id!}`);
  // const data = await res.json();
  const data = [{}];

  return (
    <main className="flex flex-1">
      {/* Chats Section */}
      <section className="flex flex-col min-w-64 mr-10 overflow-auto">
        <Search />
        {/* <ChatCard />
        <ChatCard selected />
        <ChatCard />
        <ChatCard />
        <ChatCard /> */}
        {data.map((chat: any) => (
          <ChatCard key={chat.id} {...chat} />
        ))}
      </section>
      {/* Messaging Section */}
      <Chat />
    </main>
  );
};
