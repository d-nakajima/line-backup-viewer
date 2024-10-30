"use client";
import { createContext, useCallback, useContext, useState } from "react";

type Context = {
  setHighlightText: (text: string) => void;
  highlightText: string;
  replaceHighlight: (text: string) => string;
};

const HighlightTextContext = createContext<Context>({
  setHighlightText: (text: string) => {},
  highlightText: "",
  replaceHighlight: (text: string) => text,
});

type Props = {
  children: React.ReactNode;
};

export default function HighlightTextProvider({ children }: Props) {
  const [highlightText, setHighlightText] = useState("");

  const replaceHighlight = useCallback(
    (text: string) => {
      return highlightText
        ? text.replace(
            new RegExp(`(${highlightText})`, "gi"),
            '<span class="bg-yellow-200">$1</span>'
          )
        : text;
    },
    [highlightText]
  );

  return (
    <HighlightTextContext.Provider
      value={{ setHighlightText, replaceHighlight, highlightText }}
    >
      {children}
    </HighlightTextContext.Provider>
  );
}

export function useHighlightText() {
  return useContext(HighlightTextContext);
}
