import React from "react";

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function CalendarMonth({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const firstWeekDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="snap-start flex flex-col">
      <div className="sticky top-[44px] bg-bg text-center text-base font-light text-text_grey p-2 pb-0">
        {monthNames[month]}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 text-xs font-light p-2">
        {Array.from({ length: firstWeekDay }).map((_, index) => (
          <div className="w-10 h-10" key={index} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => (
          <div
            className={`w-10 h-10 flex items-center justify-center px-1 ${
              (index + firstWeekDay) % 7 === 0
                ? "text-text_red"
                : "text-text_grey"
            }`}
            key={index}
          >
            <div>{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
