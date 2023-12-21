import React, { useMemo } from "react";

import { DiaryYear } from "./DiaryYear";

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
