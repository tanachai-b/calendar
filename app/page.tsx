"use client";

import React, { useMemo, useState } from "react";

import { Calendar, useCalendar } from "./Components/Calendar/Calendar";
import { Diary } from "./Components/Diary/Diary";
import { NavBar } from "./Components/NavBar";
import { ToolBar } from "./Components/ToolBar";

export default function Home() {
  const today = new Date();
  const defaultRawData = Array.from({ length: 3 }, (_value, index) =>
    generateCalendarData(today.getFullYear(), today.getMonth() + index)
  );

  const [calendarRawData, setCalendarRawData] = useState(defaultRawData);
  const calendarData = useMemo(
    () => combineYear(calendarRawData),
    [calendarRawData]
  );

  const calendar = useCalendar();

  function handleTodayClicked() {
    setCalendarRawData(defaultRawData);

    setTimeout(() => calendar.goToToday(), 10);
  }

  function handleRequestBefore() {
    const first = calendarRawData[0];

    const before = Array.from({ length: 3 }, (_value, index) =>
      generateCalendarData(first.year, first.month - 3 + index)
    );
    setCalendarRawData([...before, ...calendarRawData].slice(0, 12));
  }

  function handleRequestAfter() {
    const last = calendarRawData[calendarRawData.length - 1];

    const after = Array.from({ length: 3 }, (_value, index) =>
      generateCalendarData(last.year, last.month + 1 + index)
    );
    setCalendarRawData([...calendarRawData, ...after].slice(-12));
  }

  return (
    <div className="flex flex-col items-stretch h-screen">
      <NavBar />

      <ToolBar onTodayClicked={handleTodayClicked} />

      <div className="grow overflow-hidden flex flex-row items-stretch">
        <Calendar
          className="border-r border-border"
          controller={calendar}
          data={calendarData}
          onRequestBefore={handleRequestBefore}
          onRequestAfter={handleRequestAfter}
        />

        <Diary className="grow" />
      </div>
    </div>
  );
}

function combineYear(
  data: { year: number; month: number }[]
): { year: number; months: number[] }[] {
  return data.reduce<Parameters<typeof Calendar>[0]["data"]>((prev, curr) => {
    if (prev.length === 0) {
      return [{ year: curr.year, months: [curr.month] }];
    } else if (prev[prev.length - 1].year === curr.year) {
      const latest = prev[prev.length - 1];
      return [
        ...prev.slice(0, -1),
        { year: latest.year, months: [...latest.months, curr.month] },
      ];
    } else {
      return [...prev, { year: curr.year, months: [curr.month] }];
    }
  }, []);
}

function generateCalendarData(year: number, month: number) {
  const date = new Date(year, month - 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}
