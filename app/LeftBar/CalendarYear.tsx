import React from "react";

export function CalendarYear({ year }: { year: number }) {
  return (
    <div>
      <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight p-2 pb-0">
        {year}
      </div>

      {Array.from({ length: 12 }).map((_, index) => (
        <CalendarMonth key={index} year={year} month={index + 1} />
      ))}
    </div>
  );
}

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
  const firstWeekDay = new Date(year, month - 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  return (
    <div className="snap-start flex flex-col">
      <div className="sticky top-[44px] bg-bg text-center text-base font-light text-text_grey p-2 pb-0">
        {monthNames[month - 1]}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 text-xs p-2">
        {Array.from({ length: firstWeekDay }).map((_, index) => (
          <div className="w-10 h-10" key={index} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => (
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

function isToday(year: number, month: number, day: number) {
  const date = new Date(year, month - 1, day);
  const today = new Date();
  return today.toDateString() === date.toDateString();
}

function CalendarDay({
  date: index,
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
        {index}
      </div>
    </div>
  );
}
