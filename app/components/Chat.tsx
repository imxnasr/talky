"use client";

import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { Message } from "~/components";
import { messages as data } from "~/utils/data";
import { Form } from "@remix-run/react";

interface ChatProps {}

export const Chat: FC<ChatProps> = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(data);
  const scrollable = useRef<HTMLDivElement | null>(null);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message !== "") {
      console.log("Chat Section:", message);
      setMessages([...messages, { id: messages.length, text: message, sender: "user" }]);
      setMessage("");
    }
  };

  useEffect(() => {
    if (scrollable.current) {
      scrollable.current.scrollTo(0, scrollable.current.scrollHeight);
    } else {
    }
  }, [messages]);

  return (
    <section className="flex flex-col flex-1">
      {/* Header */}
      <div className="flex justify-between w-full">
        {/* Texts */}
        <div className="flex flex-col justify-between">
          <h1 className="font-bold text-3xl">John Smith</h1>
          <p className="text-colorSecondary">45 members, 24 online</p>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4 text-colorSecondary">
          <FiSearch size={25} />
          <PiDotsThreeOutlineVertical size={25} />
        </div>
      </div>
      {/* Messages */}
      <div ref={scrollable} className="flex-1 overflow-scroll">
        {messages.map((message, idx) => (
          <Message key={idx} me={message.sender === "user"} message={message.text} avatar={idx < messages.length - 1 ? messages[idx + 1].sender !== message.sender : true} />
        ))}
      </div>
      {/* Input */}
      <Form onSubmit={sendMessage} className="flex text-colorSecondary justify-between items-center -mb-5">
        <input className="bg-transparent size-full py-4" type="text" name="message" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="grid place-items-center" type="submit">
          <IoSend size={25} />
        </button>
      </Form>
    </section>
  );
};
