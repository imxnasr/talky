"use client";

import { FC, FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { Message } from "./Message";

interface ChatProps {}

export const Chat: FC<ChatProps> = () => {
  const [message, setMessage] = useState("");
  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message !== "") {
      console.log("Chat Section:", message);
      setMessage("");
    }
  };
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
      <div className="flex-1 overflow-scroll">
        <Message avatar />
        <Message me avatar />
        <Message />
        <Message />
        <Message avatar />
        <Message me />
        <Message me />
        <Message me avatar />
        <Message avatar />
        <Message me />
        <Message me avatar />
        <Message avatar />
        <Message me />
        <Message me avatar />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message avatar />
        <Message me />
        <Message me />
        <Message me />
        <Message me />
        <Message me />
        <Message me avatar />
      </div>
      {/* Input */}
      <form onSubmit={sendMessage} className="flex text-colorSecondary justify-between items-center -mb-5">
        <input className="bg-transparent size-full py-4" type="text" name="message" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="grid place-items-center" type="submit">
          <IoSend size={25} />
        </button>
      </form>
    </section>
  );
};
