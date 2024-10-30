"use client";
import { useState } from "react";
import {
  CalendarOff,
  CalendarSearch,
  ChevronLeftIcon,
  Search,
  Settings,
} from "lucide-react";
import { SearchResult } from "./SearchResult";
import dynamic from "next/dynamic";
import { set } from "date-fns";

const DateSelector = dynamic(() => import("./DateSelector"), { ssr: false });

type Props = {};

export function ChatRoomHeader(_props: Props) {
  const [searchingText, setSearchingText] = useState("");
  const [openResult, setOpenResult] = useState(false);
  const [openDateSelector, setOpenDateSelector] = useState(false);

  return (
    <div className="sticky top-0 left-0 right-0 ">
      {((openResult && searchingText !== "") || openDateSelector) && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10 -z-10"
          onClick={() => {
            setOpenResult(false);
            setOpenDateSelector(false);
          }}
        />
      )}

      <div className="flex items-center justify-between p-2 bg-white shadow">
        <button className="p-2 text-gray-600">
          <ChevronLeftIcon size={20} />
        </button>
        <div className="p-2 flex-1 flex gap-2 items-center text-gray-600 border rounded w-2/3 text-xs">
          <Search size={12} />
          <input
            type="text"
            placeholder="メッセージ"
            className="w-full outline-none"
            onFocus={() => {
              setOpenResult(true);
              setOpenDateSelector(false);
            }}
            onChange={(e) => setSearchingText(e.target.value)}
          />
        </div>
        <button
          className="p-2"
          onClick={() => {
            setOpenDateSelector(!openDateSelector);
            setOpenResult(false);
          }}
        >
          {openDateSelector ? (
            <CalendarOff size={16} />
          ) : (
            <CalendarSearch size={16} />
          )}
        </button>
        <button className="p-2">
          <Settings size={20} />
        </button>
      </div>
      {openResult && searchingText && (
        <div className="text-gray-600 relative">
          <div className="absolute left-0 top-0 right-0 bg-white max-h-[50vh] overflow-scroll rounded-b-md">
            <SearchResult
              text={searchingText}
              open={openResult}
              closer={() => setOpenResult(false)}
            />
          </div>
        </div>
      )}
      <div
        style={{ display: openDateSelector ? "block" : "none" }}
        className={`relative`}
      >
        <div className="absolute left-0 top-0 right-0 rounded-b-md bg-white  shadow">
          <DateSelector
            open={openDateSelector}
            closer={() => setOpenDateSelector(false)}
          />
        </div>
      </div>
    </div>
  );
}
