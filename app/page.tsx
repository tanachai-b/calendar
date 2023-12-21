"use client";

import React, { useState } from "react";

import {
  Calendar,
  useCalendarController,
} from "./Components/Calendar/Calendar";
import { Diary } from "./Components/Diary/Diary";
import { NavBar } from "./Components/NavBar";
import { ToolBar } from "./Components/ToolBar";

export default function Home() {
  const calendarController = useCalendarController();

  const today = new Date();
  const initialCalendarData = Array.from({ length: 3 }, (_value, index) =>
    generateCalendarData(today.getFullYear(), today.getMonth() + index)
  );

  const [calendarData, setCalendarData] = useState(initialCalendarData);

  function handleTodayClicked() {
    setCalendarData(initialCalendarData);
    setTimeout(calendarController.goToToday, 10);
  }

  function handleCalendarRequestPrevious() {
    const first = calendarData[0];

    const previousData = Array.from({ length: 3 }, (_value, index) =>
      generateCalendarData(first.year, first.month - 3 + index)
    );
    setCalendarData([...previousData, ...calendarData].slice(0, 12));
  }

  function handleCalendarRequestNext() {
    const last = calendarData[calendarData.length - 1];

    const nextData = Array.from({ length: 3 }, (_value, index) =>
      generateCalendarData(last.year, last.month + 1 + index)
    );
    setCalendarData([...calendarData, ...nextData].slice(-12));
  }

  const [diaryData, setDiaryData] = useState([
    { year: 2023, month: 12, day: 21 },
    { year: 2023, month: 12, day: 22 },
    { year: 2023, month: 12, day: 23 },
    { year: 2023, month: 12, day: 24 },
    { year: 2023, month: 12, day: 25 },
    { year: 2023, month: 12, day: 26 },
    { year: 2023, month: 12, day: 27 },
    { year: 2023, month: 12, day: 28 },
    { year: 2023, month: 12, day: 29 },
    { year: 2023, month: 12, day: 30 },
    { year: 2023, month: 12, day: 31 },
    { year: 2024, month: 1, day: 1 },
    { year: 2024, month: 1, day: 2 },
    { year: 2024, month: 1, day: 3 },
    { year: 2024, month: 1, day: 4 },
    { year: 2024, month: 1, day: 5 },
    { year: 2024, month: 1, day: 6 },
    { year: 2024, month: 1, day: 7 },
    { year: 2024, month: 1, day: 8 },
    { year: 2024, month: 1, day: 9 },
    { year: 2024, month: 1, day: 10 },
    { year: 2024, month: 1, day: 11 },
    { year: 2024, month: 1, day: 12 },
    { year: 2024, month: 1, day: 13 },
    { year: 2024, month: 1, day: 14 },
    { year: 2024, month: 1, day: 15 },
    { year: 2024, month: 1, day: 16 },
    { year: 2024, month: 1, day: 17 },
    { year: 2024, month: 1, day: 18 },
    { year: 2024, month: 1, day: 19 },
    { year: 2024, month: 1, day: 20 },
  ]);

  return (
    <div className="flex flex-col items-stretch h-screen">
      <NavBar />

      <ToolBar onTodayClicked={handleTodayClicked} />

      <div className="grow overflow-hidden flex flex-row items-stretch">
        <Calendar
          className="border-r border-border"
          controller={calendarController}
          data={calendarData}
          onRequestPrevious={handleCalendarRequestPrevious}
          onRequestNext={handleCalendarRequestNext}
          onMonthClicked={() => {}}
        />

        <Diary className="grow" data={diaryData} />
      </div>
    </div>
  );
}

function generateCalendarData(year: number, month: number) {
  const date = new Date(year, month - 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}
