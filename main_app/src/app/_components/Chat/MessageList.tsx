// components/ChatRoom.tsx
"use client";

import React, { memo } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale"; // 変更

import Message from "./Message";
import DateTag from "./DateTag";
import { Virtuoso } from "react-virtuoso";
import { useMessages } from "@/app/_providers/Chat/MessagesProvider";
import ScrollToProvider, {
  useScrollTo,
} from "@/app/_providers/Chat/ScrollToProvider";

export default function MessageList() {
  const { messages } = useMessages();

  const ContentMemo = memo(function ContentMemo({ index }: { index: number }) {
    const message = messages[index];
    const nextMessage = messages[index + 1];

    const isSameDate = nextMessage
      ? format(message.date, "yyyy/MM/dd") ===
        format(nextMessage.date, "yyyy/MM/dd")
      : false;
    const isSameYear = nextMessage
      ? format(message.date, "yyyy") === format(nextMessage.date, "yyyy")
      : false;
    const isLastMessage = index === messages.length - 1;

    return (
      <div className={`m-2 -scale-y-100 ${isLastMessage ? "pt-4" : ""}`}>
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

  const { virtuosoRef } = useScrollTo();

  return (
    <div
      className="w-full h-screen bg-[#92aad5] -scale-y-100"
      style={{
        scrollBehavior: "revert",
      }}
    >
      <ScrollToProvider>
        <Virtuoso
          ref={virtuosoRef}
          className="w-full max-w-[840px] m-auto "
          totalCount={messages.length}
          itemContent={Content}
        />
      </ScrollToProvider>
    </div>
  );
}
