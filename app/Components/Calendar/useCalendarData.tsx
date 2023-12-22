import { useState } from "react";

import { memoizedRandom, getToday, getDate } from "@/app/utils";

export function useCalendarData() {
  const { year, month } = getToday();

  const initialCalendarData = Array.from({ length: 3 }, (_value, index) =>
    generateCalendarData(year, month + index)
  );

  const [calendarData, setCalendarData] = useState(initialCalendarData);

  function handleCalendarRequestPrevious() {
    setCalendarData((calendarData) => {
      const first = calendarData[0];

      const previousData = Array.from({ length: 3 }, (_value, index) =>
        generateCalendarData(first.year, first.month - 3 + index)
      );
      return [...previousData, ...calendarData].slice(0, 12);
    });
  }

  function handleCalendarRequestNext() {
    setCalendarData((calendarData) => {
      const last = calendarData[calendarData.length - 1];

      const nextData = Array.from({ length: 3 }, (_value, index) =>
        generateCalendarData(last.year, last.month + 1 + index)
      );
      return [...calendarData, ...nextData].slice(-12);
    });
  }

  function generateCalendarData(year: number, month: number) {
    const date = getDate(year, month, 1);
    const daysInMonth = getDate(year, month + 1, 0).day;

    return {
      year: date.year,
      month: date.month,
      days: [
        ...Array.from({ length: daysInMonth }, (_value, index) => {
          const date = getDate(year, month, index + 1);

          return {
            day: date.day,
            keypointCount: Math.floor(
              memoizedRandom(
                `${date.year} ${date.month} ${date.day} keypointCount`
              ) **
                3 *
                4
            ),
          };
        }),
      ],
    };
  }

  return {
    initialCalendarData,
    calendarData,
    setCalendarData,
    handleCalendarRequestPrevious,
    handleCalendarRequestNext,
  };
}
