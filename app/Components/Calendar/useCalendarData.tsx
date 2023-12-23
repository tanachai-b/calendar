import { useState } from "react";

import { memoizedRandom, getToday, getDate } from "@/app/utils";

export function useCalendarData() {
  const { year, month } = getToday();

  const initialCalendarData = [generateCalendarData(year, month)];

  const [calendarData, setCalendarData] = useState(initialCalendarData);

  function handleCalendarRequestPrevious() {
    setCalendarData((calendarData) => {
      if (calendarData.length === 0) return calendarData;

      const first = calendarData[0];
      const previousData = generateCalendarData(first.year, first.month - 1);
      return [previousData, ...calendarData];
    });
  }

  function handleCalendarRemovePrevious() {
    setCalendarData((calendarData) => calendarData.slice(1));
  }

  function handleCalendarRequestNext() {
    setCalendarData((calendarData) => {
      if (calendarData.length === 0) return calendarData;

      const last = calendarData[calendarData.length - 1];
      const nextData = generateCalendarData(last.year, last.month + 1);
      return [...calendarData, nextData];
    });
  }

  function handleCalendarRemoveNext() {
    setCalendarData((calendarData) => calendarData.slice(0, -1));
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
    handleCalendarRemovePrevious,
    handleCalendarRequestNext,
    handleCalendarRemoveNext,
    generateCalendarData,
  };
}
