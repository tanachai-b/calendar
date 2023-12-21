import React, { MutableRefObject } from "react";

import { CalendarMonth } from "./CalendarMonth";

function isCurrentMonth(year: number, month: number) {
  const date = new Date(year, month - 1, 1);
  const today = new Date();
  today.setDate(1);
  return today.toDateString() === date.toDateString();
}

export function CalendarYear({
  year,
  todayRef,
}: {
  year: number;
  todayRef: MutableRefObject<null>;
}) {
  return (
    <div>
      <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight text-text_white p-2.5 pb-0">
        {year}
      </div>

      {Array.from({ length: 12 }).map((_, index) => (
        <CalendarMonth
          key={index}
          year={year}
          month={index + 1}
          todayRef={isCurrentMonth(year, index + 1) ? todayRef : undefined}
        />
      ))}
    </div>
  );
}
