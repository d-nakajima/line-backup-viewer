"use client";
import React, { use, useEffect, useRef } from "react";
import {
  format,
  getDaysInMonth,
  startOfMonth,
  getDay,
  eachMonthOfInterval,
  endOfMonth,
  add,
  isSameDay,
} from "date-fns";
import { useMessages } from "@/app/_providers/Chat/MessagesProvider";
import { useScrollTo } from "@/app/_providers/Chat/ScrollToProvider";

type Props = {
  open: boolean;
  closer: () => void;
};
export default function DateSelector(props: Props) {
  const { messages } = useMessages();
  const { scrollToIndex } = useScrollTo();

  const messagesDateSet = new Set<string>(
    messages.map((msg) => format(msg.date, "yyyy-MM-dd"))
  );

  const startDay = startOfMonth(messages[0].date);
  const endDay = startOfMonth(messages[messages.length - 1].date);

  const months = eachMonthOfInterval({ start: startDay, end: endDay });

  const handleDateClick = (date: Date) => {
    const index = messages.findIndex((msg) => isSameDay(msg.date, date));
    scrollToIndex(index);
    props.closer();
  };

  const getMonthCalendar = (month: Date) => {
    const firstDate = startOfMonth(month);
    const firstDay = getDay(firstDate);
    const lastDay = getDay(endOfMonth(month));
    const days = getDaysInMonth(month);
    const daysArray: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) daysArray.push(null);
    for (let i = 0; i < days; i++) daysArray.push(add(firstDate, { days: i }));
    for (let i = lastDay; i < 6; i++) daysArray.push(null);

    return daysArray;
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scroll({
      top: scrollRef.current.scrollHeight,
    });
  }, [props.open]);

  return (
    <div className="">
      <div className="border-t p-4 pt-2">
        <div className="grid grid-cols-7 gap-1 text-center text-gray-600">
          {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
            <span key={day} className="text-xs">
              {day}
            </span>
          ))}
        </div>
        <div className="h-[210px] overflow-y-scroll" ref={scrollRef}>
          {months.map((month) => (
            <div key={month.toDateString()} className="my-2">
              <div className={"text-center my-2"}>
                <span className="text-xs border rounded-full px-2 py-(2px) bg-gray-200">
                  {format(month, "yyyy/MM")}
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {getMonthCalendar(month).map((day, index) => {
                  if (day) {
                    const hasMessage = messagesDateSet.has(
                      format(day, "yyyy-MM-dd")
                    );
                    return (
                      <div
                        key={index}
                        className="flex justify-center align-center"
                      >
                        <button
                          className={`h-7 w-7 rounded-full text-sm active:bg-lime-200 ${
                            hasMessage
                              ? "text-black cursor-pointer"
                              : "text-gray-400"
                          }`}
                          onClick={() => hasMessage && handleDateClick(day)}
                        >
                          {day.getDate()}
                        </button>
                      </div>
                    );
                  } else {
                    return <div key={index}></div>;
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
