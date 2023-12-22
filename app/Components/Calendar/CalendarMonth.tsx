import React, { MutableRefObject, useRef } from "react";

import { CalendarDay } from "./CalendarDay";
import { monthNames } from "../../constants";
import { isToday, getDate } from "../../utils";

export function CalendarMonth({
  year,
  month,
  days,
  todayRef,
  onDayClick,
}: {
  year: number;
  month: number;
  days: { day: number; keypointCount: number }[];
  todayRef?: MutableRefObject<null>;
  onDayClick: (day: number, monthRef: MutableRefObject<null>) => void;
}) {
  const monthRef = useRef(null);

  const firstWeekDay = getDate(year, month, 1).weekday;
  const daysInMonth = getDate(year, month + 1, 0).day;

  return (
    <div ref={monthRef}>
      <div className="flex flex-col" ref={todayRef}>
        <div className="sticky top-[46px] bg-bg text-center text-base font-light text-text_grey p-2.5 pb-0">
          {monthNames[month - 1]}
        </div>

        <div className="grid grid-cols-7 grid-rows-6 text-xs p-2.5">
          {Array.from({ length: firstWeekDay }, (_value, index) => (
            <div className="w-10 h-10" key={index} />
          ))}

          {Array.from({ length: daysInMonth }, (_value, index) => (
            <CalendarDay
              key={`${year}-${month}-${index + 1}`}
              day={index + 1}
              keypointCount={
                days.find(({ day }) => day === index + 1)?.keypointCount ?? 0
              }
              isSunday={(index + firstWeekDay) % 7 === 0}
              isToday={isToday(year, month, index + 1)}
              onClick={() => onDayClick(index + 1, monthRef)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
