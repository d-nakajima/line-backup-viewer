// components/ChatRoom.tsx
"use client";

import React from "react";

import { getMessages } from "@/app/lib/storage";
import { ChatRoomHeader } from "./Header";
import MessageList from "./MessageList";
import MessagesProvider from "@/app/_providers/Chat/MessagesProvider";
import ScrollToProvider from "@/app/_providers/Chat/ScrollToProvider";
import HighlightTextProvider from "@/app/_providers/Chat/HighlightTextProvider";

export default function ChatRoom() {
  return (
    <div className="w-screen flex flex-col h-screen bg-[#92aad5]">
      <MessagesProvider messages={getMessages("大志")}>
        <HighlightTextProvider>
          <ScrollToProvider>
            {/* Header */}
            <div className="z-10">
              <ChatRoomHeader />
            </div>
            {/* Messages */}
            <MessageList />
          </ScrollToProvider>
        </HighlightTextProvider>
      </MessagesProvider>
    </div>
  );
}
