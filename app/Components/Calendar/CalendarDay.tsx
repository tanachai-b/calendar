import React from "react";

export function CalendarDay({
  date,
  isSunday,
  isToday,
}: {
  date: number;
  isSunday: boolean;
  isToday: boolean;
}) {
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center px-1 ${
        isSunday ? "text-text_red" : "text-text_grey"
      } ${isToday ? "text-bg" : ""}`}
    >
      <div
        className={`w-4 h-4 rounded text-center leading-4  ${
          isToday ? "bg-yellow" : ""
        }`}
      >
        {date}
      </div>
    </div>
  );
}
