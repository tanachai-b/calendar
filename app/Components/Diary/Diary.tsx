import React, { useMemo } from "react";

import { DiaryDay } from "./DiaryDay";
import { monthNames } from "../../constants";

export function Diary({
  className,
  data,
}: {
  className: string;
  data: { year: number; month: number; day: number }[];
}) {
  const dataCombinedYear = useMemo(
    () => combineYear(combineMonth(data)),
    [data]
  );

  return (
    <div className={`overflow-y-auto scroll-pt-[46px] ${className}`}>
      {dataCombinedYear.map(({ year, months }) => (
        <DiaryYear key={year} year={year} months={months} />
      ))}
    </div>
  );
}

function DiaryYear({
  year,
  months,
}: {
  year: number;
  months: { month: number; days: { day: number }[] }[];
}) {
  return (
    <div>
      <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight text-text_white p-2.5 pb-0">
        {year}
      </div>

      {months.map(({ month, days }, index) => (
        <DiaryMonth key={index} year={year} month={month} days={days} />
      ))}
    </div>
  );
}

function DiaryMonth({
  year,
  month,
  days,
}: {
  year: number;
  month: number;
  days: { day: number }[];
}) {
  return (
    <div>
      <div className="sticky top-[46px] bg-bg text-center text-base font-light text-text_white p-2.5 pb-0">
        {monthNames[month - 1]}
      </div>

      {days.map(({ day }, index) => (
        <DiaryDay
          key={index}
          day={day}
          weekday={getWeekdayName(year, month, day)}
        />
      ))}
    </div>
  );
}

function combineMonth(data: { year: number; month: number; day: number }[]) {
  return data.reduce<
    { year: number; month: number; days: { day: number }[] }[]
  >((prev, { year, month, day }) => {
    const lastMonth = prev[prev.length - 1];

    if (prev.length === 0) {
      return [{ year, month, days: [{ day }] }];
    } else if (lastMonth.year === year && lastMonth.month === month) {
      return [
        ...prev.slice(0, -1),
        {
          year: lastMonth.year,
          month: lastMonth.month,
          days: [...lastMonth.days, { day }],
        },
      ];
    } else {
      return [...prev, { year, month, days: [{ day }] }];
    }
  }, []);
}

function combineYear(
  data: { year: number; month: number; days: { day: number }[] }[]
) {
  return data.reduce<
    { year: number; months: { month: number; days: { day: number }[] }[] }[]
  >((prev, { year, month, days }) => {
    const lastYear = prev[prev.length - 1];

    if (prev.length === 0) {
      return [{ year, months: [{ month, days }] }];
    } else if (lastYear.year === year) {
      return [
        ...prev.slice(0, -1),
        { year: lastYear.year, months: [...lastYear.months, { month, days }] },
      ];
    } else {
      return [...prev, { year, months: [{ month, days }] }];
    }
  }, []);
}

function getWeekdayName(year: number, month: number, day: number): number {
  return new Date(year, month - 1, day).getDay();
}
