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

  const initialDiaryData = Array.from({ length: 7 }, (_value, index) =>
    generateDiaryData(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate() - 3 + index
    )
  );

  const [diaryData, setDiaryData] = useState(initialDiaryData);

  function handleDiaryRequestPrevious() {
    const first = diaryData[0];

    const previousData = Array.from({ length: 7 }, (_value, index) =>
      generateDiaryData(first.year, first.month, first.day - 7 + index)
    );
    setDiaryData([...previousData, ...diaryData].slice(0, 28));
  }

  function handleDiaryRequestNext() {
    const last = diaryData[diaryData.length - 1];

    const nextData = Array.from({ length: 7 }, (_value, index) =>
      generateDiaryData(last.year, last.month, last.day + 1 + index)
    );
    setDiaryData([...diaryData, ...nextData].slice(-28));
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />

      <ToolBar onTodayClicked={handleTodayClicked} />

      <div className="grow flex flex-row overflow-hidden">
        <Calendar
          className="shrink-0 border-r border-border"
          controller={calendarController}
          data={calendarData}
          onRequestPrevious={handleCalendarRequestPrevious}
          onRequestNext={handleCalendarRequestNext}
          onMonthClicked={() => {}}
        />

        <Diary
          className="grow"
          data={diaryData}
          onRequestPrevious={handleDiaryRequestPrevious}
          onRequestNext={handleDiaryRequestNext}
        />
      </div>
    </div>
  );
}

function generateCalendarData(year: number, month: number) {
  const date = new Date(year, month - 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

function generateDiaryData(year: number, month: number, day: number) {
  const date = new Date(year, month - 1, day);

  const x = Math.random();
  const y = Math.random();

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    keypoints:
      x < 0.15
        ? ["went to office", "had dinner with colleagues", "went on a trip"]
        : [],
    notes:
      y < 0.15
        ? [
            { time: "9:00", note: "leave home \n leave a bit late" },
            { time: "10:00", note: "arrive at office" },
            { time: "15:00", note: "went on a trip \n have fun" },
          ]
        : [],
  };
}
