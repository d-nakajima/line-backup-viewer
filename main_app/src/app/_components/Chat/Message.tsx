"use client";
import { useHighlightText } from "@/app/_providers/Chat/HighlightTextProvider";

import { Message as MessageType } from "@/app/_types/Chat";
import { format } from "date-fns";
import React from "react";

type Props = {} & MessageType;

export default function Message(props: Props) {
  const { replaceHighlight } = useHighlightText();

  return (
    <div
      className={`flex ${
        props.sender === "outgoing" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative gap-1 ${
          props.sender === "incoming" ? "flex" : "flex flex-row-reverse"
        }`}
      >
        <div
          dangerouslySetInnerHTML={{ __html: replaceHighlight(props.text) }}
          className={`text-gray-800 whitespace-pre-wrap w-full shadow px-3 py-2 rounded-[16px] text-[12px] ${
            props.sender === "incoming" ? "bg-white" : "bg-green-100"
          }`}
        ></div>
        <span className="text-xs text-gray-500  bottom-[-16px] right-0 whitespace-nowrap flex-grow self-end">
          {format(props.date, "HH:mm")}
        </span>
      </div>
    </div>
  );
}
