import { useState } from "react";

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
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  }

  return {
    initialCalendarData,
    calendarData,
    setCalendarData,
    handleCalendarRequestPrevious,
    handleCalendarRequestNext,
  };
}
