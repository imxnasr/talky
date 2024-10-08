import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { Message, Spinner } from "~/components";
import { Form, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession } from "~/sessions";
import { useFetch } from "~/hooks";
import prisma from "~/utils/prisma";
import pusherClient from "~/utils/pusher.client";
import pusherServer from "~/utils/pusher";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("id")) return redirect("/chats");
  return { userId: session.get("id"), chatId: params.id };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();

  // Getting the userId from the session
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("id")) return redirect("/chats");
  const userId = session.get("id");

  // Creating the message data
  const newMessage = {
    senderId: userId,
    body: formData.get("message") as string,
    createdAt: new Date().toISOString(),
  };
  // Pusher WebSocket
  await pusherServer.trigger(params.id as string, "messages:new", newMessage);

  // Creating the message in the database
  try {
    const createdMessage = await prisma.message.create({
      data: {
        sender: {
          connect: {
            id: userId,
          },
        },
        chat: {
          connect: {
            id: params.id,
          },
        },
        body: formData.get("message") as string,
      },
    });
    await prisma.chat.update({
      where: {
        id: params.id,
      },
      data: {
        updatedAt: new Date().toISOString(),
      },
    });
    return { message: createdMessage };
  } catch (e) {
    console.log(e);
    return { error: "Error creating message" };
  }
};

export default () => {
  const { userId, chatId } = useLoaderData<typeof loader>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const scrollable = useRef<HTMLDivElement | null>(null);
  const { data, error, loading } = useFetch("/api/chats/" + chatId + "?userId=" + userId);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId as string);
    channel.bind("messages:new", (message: any) => {
      setMessages((prev) => [...prev, message]);
      scrollable.current?.scrollTo(0, scrollable.current.scrollHeight);
    });
    return () => {
      channel.unsubscribe();
      channel.unbind("messages:new");
    };
  }, []);

  useEffect(() => {
    if (data?.messages.length > 0) setMessages(data.messages);
  }, [data]);

  useEffect(() => {
    if (scrollable.current) {
      scrollable.current.scrollTo(0, scrollable.current.scrollHeight);
    }
  }, [messages]);

  const submitFn = async () => {
    if (message.length === 0) return;
    setMessage("");
  };

  return (
    <section className="flex flex-col flex-1">
      {/* Header */}
      <div className="flex justify-between w-full">
        {/* Texts */}
        <div className="flex flex-col justify-between">
          <h1 className="font-bold text-3xl">{loading ? "Loading..." : data?.chatName}</h1>
          <p className="text-colorSecondary">{data?.chatIsGroup ? data?.usersCount + " members," : ""} 24 online</p>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4 text-colorSecondary">
          <FiSearch size={25} />
          <PiDotsThreeOutlineVertical size={25} />
        </div>
      </div>
      {/* Messages */}
      {/* TODO: Add error handling */}
      <div ref={scrollable} className="flex-1 overflow-scroll">
        {loading ? (
          <Spinner className="text-center mx-auto" size={30} />
        ) : (
          <>
            {messages.map((message: any, idx: number) => (
              <Message key={idx} me={message.senderId === userId} message={message.body as string} avatar={idx < messages.length - 1 ? messages[idx + 1].senderId !== message.senderId : true} />
            ))}
          </>
        )}
      </div>
      {/* Input */}
      <Form onSubmit={submitFn} method="post" className="flex text-colorSecondary justify-between items-center -mb-5">
        <input className="bg-transparent size-full py-4" type="text" name="message" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="grid place-items-center" type="submit">
          <IoSend size={25} />
        </button>
      </Form>
    </section>
  );
};
