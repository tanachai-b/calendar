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
  months,
  todayRef,
  onMonthClicked,
}: {
  year: number;
  months: number[];
  todayRef: MutableRefObject<null>;
  onMonthClicked: (
    monthRef: MutableRefObject<null>,
    year: number,
    month: number
  ) => void;
}) {
  return (
    <div>
      <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight text-text_white p-2.5 pb-0">
        {year}
      </div>

      {months.map((month) => (
        <CalendarMonth
          key={`${year}-${month}`}
          year={year}
          month={month}
          todayRef={isCurrentMonth(year, month) ? todayRef : undefined}
          onClick={(monthRef) => onMonthClicked(monthRef, year, month)}
        />
      ))}
    </div>
  );
}
