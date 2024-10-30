"use client";
import { createContext, useContext } from "react";
import { Message } from "../../_types/Chat";
import { compareDesc } from "date-fns";

type Context = {
  messages: Message[];
};

const MessageContext = createContext<Context>({
  messages: [],
});

type Props = {
  children: React.ReactNode;
  messages: Message[];
};

export default function MessagesProvider({ children, messages }: Props) {
  const _messages = messages.toSorted((a, b) => compareDesc(a.date, b.date));

  return (
    <MessageContext.Provider value={{ messages: _messages }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessageContext);
}
