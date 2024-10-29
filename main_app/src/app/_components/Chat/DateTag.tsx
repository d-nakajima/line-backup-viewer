// components/DateTag.tsx

import React from "react";

type Props = {
  date: string;
};

export default function DateTag({ date }: Props) {
  return (
    <div className="text-center my-2">
      <span className="px-2 py-1 text-xs text-white bg-[#00000044] rounded-full">
        {date}
      </span>
    </div>
  );
}
