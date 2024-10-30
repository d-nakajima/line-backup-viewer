"use client";

import { createContext, useContext, useRef } from "react";
import { VirtuosoHandle } from "react-virtuoso";

type Context = {
  scrollToIndex: (index: number) => void;
  virtuosoRef: React.RefObject<VirtuosoHandle> | null;
};

const ScrollToContext = createContext<Context>({
  scrollToIndex: (index: number) => {},
  virtuosoRef: null,
});

type Props = {
  children: React.ReactNode;
};

export default function ScrollToProvider({ children }: Props) {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const scrollToIndex = (index: number) => {
    virtuosoRef.current?.scrollToIndex({ index });
  };

  return (
    <ScrollToContext.Provider value={{ scrollToIndex, virtuosoRef }}>
      {children}
    </ScrollToContext.Provider>
  );
}

export function useScrollTo() {
  return useContext(ScrollToContext);
}
