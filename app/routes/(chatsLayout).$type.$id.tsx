import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { Message } from "~/components";
import { Form, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession } from "~/sessions";
import prisma from "~/utils/prisma";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const chat = await prisma.chat.findUnique({
    where: {
      id: params.id,
      users: {
        some: {
          id: session.get("id"),
        },
      },
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
        where: {
          id: { not: session.get("id") },
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!chat) return redirect("/chats");
  return {
    currentUser: session.get("id"),
    chatName: chat.isGroup ? chat.name : chat.users.length > 0 ? chat.users[0].name : "",
    chatIsGroup: chat.isGroup,
    usersCount: chat.users.length + 1,
    messages: chat?.messages || [],
  };
};

export default () => {
  const data = useLoaderData<typeof loader>();
  const messagesData = data.messages;
  const [messages, setMessages] = useState(messagesData);
  const scrollable = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollable.current) {
      scrollable.current.scrollTo(0, scrollable.current.scrollHeight);
    }
  }, [messages]);

  return (
    <section className="flex flex-col flex-1">
      {/* Header */}
      <div className="flex justify-between w-full">
        {/* Texts */}
        <div className="flex flex-col justify-between">
          <h1 className="font-bold text-3xl">{data.chatName}</h1>
          <p className="text-colorSecondary">{data.chatIsGroup ? data.usersCount + " members," : ""} 24 online</p>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4 text-colorSecondary">
          <FiSearch size={25} />
          <PiDotsThreeOutlineVertical size={25} />
        </div>
      </div>
      {/* Messages */}
      <div ref={scrollable} className="flex-1 overflow-scroll">
        {messages.map((message: (typeof messagesData)[0], idx) => (
          <Message key={idx} me={message.senderId === data.currentUser} message={message.body as string} avatar={idx < messages.length - 1 ? messages[idx + 1].senderId !== message.senderId : true} />
        ))}
      </div>
      {/* Input */}
      <Form className="flex text-colorSecondary justify-between items-center -mb-5">
        <input className="bg-transparent size-full py-4" type="text" name="message" placeholder="Your message" />
        <button className="grid place-items-center" type="submit">
          <IoSend size={25} />
        </button>
      </Form>
    </section>
  );
};
