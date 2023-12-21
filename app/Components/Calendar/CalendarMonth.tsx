import React, { MutableRefObject, useRef } from "react";

import { CalendarDay } from "./CalendarDay";
import { monthNames } from "../../constants";
import { isToday } from "../utils";

export function CalendarMonth({
  year,
  month,
  todayRef,
  onClick,
}: {
  year: number;
  month: number;
  todayRef?: MutableRefObject<null>;
  onClick: (monthRef: MutableRefObject<null>) => void;
}) {
  const monthRef = useRef(null);

  const firstWeekDay = new Date(year, month - 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  return (
    <div
      className="group hover:bg-bg_hover cursor-pointer"
      ref={monthRef}
      onClick={() => onClick(monthRef)}
    >
      <div className="flex flex-col" ref={todayRef}>
        <div className="sticky top-[46px] bg-bg group-hover:bg-bg_hover text-center text-base font-light text-text_grey p-2.5 pb-0">
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
    </div>
  );
}
