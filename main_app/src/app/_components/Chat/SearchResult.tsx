"use client";

import { useHighlightText } from "@/app/_providers/Chat/HighlightTextProvider";
import { useMessages } from "@/app/_providers/Chat/MessagesProvider";
import { useScrollTo } from "@/app/_providers/Chat/ScrollToProvider";
import { Message } from "@/app/_types/Chat";
import { format } from "date-fns";

type Props = {
  text: string;
  open: boolean;
  closer: () => void;
};

export function SearchResult(props: Props) {
  const { messages } = useMessages();

  const { scrollToIndex } = useScrollTo();
  const { setHighlightText } = useHighlightText();

  const highlight = (message: string) => {
    return message.replace(
      new RegExp(`(${props.text})`, "gi"),
      '<span class="bg-yellow-200">$1</span>'
    );
  };

  const searchingMessages: (Message & { originalIndex: number })[] = [];
  messages.forEach((message, index) => {
    if (message.text.includes(props.text)) {
      searchingMessages.push({
        originalIndex: index,
        ...message,
        text: message.text.slice(
          Math.max(0, message.text.indexOf(props.text) - 8)
        ),
      });
    }
  });

  return (
    <div className={`w-full ${props.open ? "" : "max-h-0"}`}>
      {searchingMessages.map((message, index) => (
        <div
          key={index}
          className="flex w-full p-2 overflow-hidden"
          onClick={() => {
            props.closer();
            setHighlightText(props.text);
            scrollToIndex(message.originalIndex);
          }}
        >
          <div className="flex-grow">
            <div className="font-bold text-xs">{message.name}</div>
            <div
              className="text-xs whitespace-pre-wrap line-clamp-2 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: highlight(message.text) }}
            />
          </div>
          <div className="text-xs flex-shrink-0">
            {format(message.date, "MM/dd")}
          </div>
        </div>
      ))}
      {searchingMessages.length === 0 && (
        <div className="text-center text-gray-500 text-sm p-5">
          検索結果がありません
        </div>
      )}
    </div>
  );
}
