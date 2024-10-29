// components/ChatRoom.tsx
"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale"; // 変更

import Message from "./Message";
import DateTag from "./DateTag";
import { getMessages } from "@/app/lib/storage";

type Props = {
  messages: {
    text: string;
    date: string;
    sender: "incoming" | "outgoing";
  }[];
};

export default function ChatRoom(props: Props) {
  console.log(props);
  const [searchTerm, setSearchTerm] = useState("");

  const isSameDate = (date1: Date, date2: Date | undefined) => {
    if (!date2) return false;
    return format(date1, "yyyy/MM/dd") === format(date2, "yyyy/MM/dd");
  };
  const isSameYear = (date1: Date, date2: Date | undefined) => {
    if (!date2) return false;
    return format(date1, "yyyy") === format(date2, "yyyy");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredMessages = getMessages("大志")
    .filter((message) =>
      message.text?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 100);

  return (
    <div className="w-screen overflow-x-hidden flex flex-col h-screen bg-[#92aad5] ">
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
        {filteredMessages.map((message, i) => (
          <div key={i}>
            {!isSameDate(message.date, filteredMessages[i - 1]?.date) && (
              <DateTag
                date={
                  isSameYear(message.date, filteredMessages[i - 1]?.date)
                    ? format(message.date, "MM/dd(E)", { locale: ja })
                    : format(message.date, "yyyy/MM/dd(E)", {
                        locale: ja,
                      })
                }
              />
            )}
            <Message {...message} />
          </div>
        ))}
      </div>
    </div>
  );
}
