// components/ChatRoom.tsx
"use client";

import React, { memo, useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale"; // 変更

import Message from "./Message";
import DateTag from "./DateTag";
import { getMessages } from "@/app/lib/storage";
import { Virtuoso } from "react-virtuoso";

export default function ChatRoom() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredMessages = getMessages("大志").filter((message) =>
    message.text?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ContentMemo = memo(function ContentMemo({ index }: { index: number }) {
    const message = filteredMessages[index];
    const prevMessage = filteredMessages[index - 1];

    const isSameDate = prevMessage
      ? format(message.date, "yyyy/MM/dd") ===
        format(prevMessage.date, "yyyy/MM/dd")
      : false;
    const isSameYear = prevMessage
      ? format(message.date, "yyyy") === format(prevMessage.date, "yyyy")
      : false;
    const isLastMessage = index === filteredMessages.length - 1;

    return (
      <div className={`m-2 ${isLastMessage ? "pb-4" : ""}`}>
        {!isSameDate && (
          <DateTag
            date={
              isSameYear
                ? format(message.date, "MM/dd(E)", { locale: ja })
                : format(message.date, "yyyy/MM/dd(E)", {
                    locale: ja,
                  })
            }
          />
        )}
        <Message {...message} />
      </div>
    );
  });

  const Content = (index: number) => <ContentMemo index={index} />;

  return (
    <div className="w-screen flex flex-col h-screen bg-[#92aad5]">
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
      <Virtuoso
        className="w-full max-w-[840px] m-auto"
        totalCount={filteredMessages.length}
        itemContent={Content}
      />
    </div>
  );
}
