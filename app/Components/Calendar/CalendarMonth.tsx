import React, { MutableRefObject } from "react";

import { CalendarDay } from "./CalendarDay";
import { monthNames } from "../../constants";

function isToday(year: number, month: number, day: number) {
  const date = new Date(year, month - 1, day);
  const today = new Date();
  return today.toDateString() === date.toDateString();
}

export function CalendarMonth({
  year,
  month,
  todayRef,
}: {
  year: number;
  month: number;
  todayRef?: MutableRefObject<null>;
}) {
  const firstWeekDay = new Date(year, month - 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  return (
    <div className="snap-start flex flex-col" ref={todayRef}>
      <div className="sticky top-[46px] bg-bg text-center text-base font-light text-text_grey px-2.5">
        {monthNames[month - 1]}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 text-xs p-2.5">
        {Array.from({ length: firstWeekDay }, (_value, index) => (
          <div className="w-10 h-10" key={index} />
        ))}

        {Array.from({ length: daysInMonth }, (_value, index) => (
          <CalendarDay
            key={index}
            date={index + 1}
            isSunday={(index + firstWeekDay) % 7 === 0}
            isToday={isToday(year, month, index + 1)}
          />
        ))}
      </div>
    </div>
  );
}
