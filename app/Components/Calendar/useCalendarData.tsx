import { useState } from "react";

import { memoizedRandom } from "@/app/utils";

export function useCalendarData() {
  const today = new Date();

  const initialCalendarData = Array.from({ length: 1 }, (_value, index) =>
    generateCalendarData(today.getFullYear(), today.getMonth() + 1 + index)
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
    const date = new Date(year, month - 1);
    const properYear = date.getFullYear();
    const properMonth = date.getMonth() + 1;

    const daysInMonth = new Date(year, month, 0).getDate();

    return {
      year: properYear,
      month: properMonth,
      days: [
        ...Array.from({ length: daysInMonth }, (_value, index) => {
          const date = new Date(year, month - 1, index + 1);
          const properYear = date.getFullYear();
          const properMonth = date.getMonth() + 1;
          const properDay = date.getDate();

          return {
            day: properDay,
            keypointCount: Math.floor(
              memoizedRandom(
                `${properYear} ${properMonth} ${properDay} keypointCount`
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
