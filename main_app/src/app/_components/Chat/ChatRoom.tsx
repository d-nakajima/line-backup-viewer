// components/ChatRoom.tsx
"use client";

import React, { useState } from "react";
import Message from "./Message";
import DateTag from "./DateTag";

type Props = {
  messages: {
    id: number;
    text: string;
    date: string;
    sender: "incoming" | "outgoing";
  }[];
};

export default function ChatRoom({ messages }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 flex flex-col h-screen bg-gray-100 ">
      {/* Header */}
      <div className="h-16 flex items-center justify-between p-4 bg-white shadow sticky top-0 left-0 right-0">
        {/* BackButton */}
        <button className="p-2 text-gray-500 hover:text-gray-700">&lt;</button>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded w-2/3"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="p-2 text-gray-500 hover:text-gray-700">⚙️</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMessages.map((message) => (
          <div key={message.id}>
            <DateTag date={message.date} />
            <Message
              text={message.text}
              sender={message.sender}
              highlight={searchTerm}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
