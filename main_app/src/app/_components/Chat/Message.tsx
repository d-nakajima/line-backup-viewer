// components/MessageBubble.tsx

import React from "react";

type Props = {
  text: string;
  sender: "incoming" | "outgoing";
  highlight?: string;
};

export default function Message({ text, sender, highlight = "" }: Props) {
  const highlightedText = highlight
    ? text.replace(
        new RegExp(`(${highlight})`, "gi"),
        '<span class="bg-yellow-200">$1</span>'
      )
    : text;

  return (
    <div
      className={`flex ${
        sender === "outgoing" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-xs p-3 rounded-lg shadow ${
          sender === "incoming" ? "bg-white" : "bg-green-100"
        }`}
      >
        <span
          dangerouslySetInnerHTML={{ __html: highlightedText }}
          className="text-gray-800"
        ></span>
        <span className="text-xs text-gray-500 absolute bottom-0 right-0">
          {/* Here the date or time would go if desired */}
        </span>
      </div>
    </div>
  );
}
