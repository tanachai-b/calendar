import React from "react";

export function CalendarDay({
  day,
  isSunday,
  isToday,
  onClick,
}: {
  day: number;
  isSunday: boolean;
  isToday: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`w-10 h-10 hover:bg-bg_hover cursor-pointer flex items-center justify-center px-1 ${
        isToday ? "text-bg" : isSunday ? "text-text_red" : "text-text_grey"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-4 h-4 rounded text-center leading-4 ${
          isToday ? "bg-highlight_yellow font-medium" : ""
        }`}
      >
        {day}
      </div>
    </div>
  );
}
