"use client";

import React, { useState } from "react";

import { Calendar } from "./Components/Calendar/Calendar";
import { Diary } from "./Components/Diary/Diary";
import { NavBar } from "./Components/NavBar";
import { ToolBar } from "./Components/ToolBar";
import { randomizedArray } from "./utils";

export default function Home() {
  const {
    initialCalendarData,
    calendarData,
    setCalendarData,
    handleCalendarRequestPrevious,
    handleCalendarRequestNext,
  } = useCalendar();

  const {
    initialDiaryData,
    diaryData,
    setDiaryData,
    handleDiaryRequestPrevious,
    handleDiaryRequestNext,
  } = useDiary();

  function handleTodayClicked() {
    setCalendarData(initialCalendarData);
    setDiaryData(initialDiaryData);
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />

      <ToolBar onTodayClicked={handleTodayClicked} />

      <div className="grow flex flex-row overflow-hidden">
        <Calendar
          className="shrink-0 border-r border-border"
          data={calendarData}
          onRequestPrevious={handleCalendarRequestPrevious}
          onRequestNext={handleCalendarRequestNext}
          onDayClick={() => {}}
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

function useCalendar() {
  const today = new Date();

  const initialCalendarData = Array.from({ length: 1 }, (_value, index) =>
    generateCalendarData(today.getFullYear(), today.getMonth() + 1 + index)
  );

  const [calendarData, setCalendarData] = useState(initialCalendarData);

  function handleCalendarRequestPrevious() {
    setCalendarData((calendarData) => {
      const first = calendarData[0];

      const previousData = Array.from({ length: 1 }, (_value, index) =>
        generateCalendarData(first.year, first.month - 1 + index)
      );
      return [...previousData, ...calendarData].slice(0, 12);
    });
  }

  function handleCalendarRequestNext() {
    setCalendarData((calendarData) => {
      const last = calendarData[calendarData.length - 1];

      const nextData = Array.from({ length: 1 }, (_value, index) =>
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

function useDiary() {
  const today = new Date();

  const initialDiaryData = Array.from({ length: 7 }, (_value, index) =>
    generateDiaryData(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate() + index
    )
  );

  const [diaryData, setDiaryData] = useState(initialDiaryData);

  function handleDiaryRequestPrevious() {
    setDiaryData((diaryData) => {
      const first = diaryData[0];

      const previousData = Array.from({ length: 7 }, (_value, index) =>
        generateDiaryData(first.year, first.month, first.day - 7 + index)
      );
      return [...previousData, ...diaryData].slice(0, 28);
    });
  }

  function handleDiaryRequestNext() {
    setDiaryData((diaryData) => {
      const last = diaryData[diaryData.length - 1];

      const nextData = Array.from({ length: 7 }, (_value, index) =>
        generateDiaryData(last.year, last.month, last.day + 1 + index)
      );
      return [...diaryData, ...nextData].slice(-28);
    });
  }

  function generateDiaryData(year: number, month: number, day: number) {
    const date = new Date(year, month - 1, day);

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      keypoints: randomizedArray({
        array: ["go to office", "have lunch with colleagues", "go to museum"],
        memoizeKey: `${year} ${month} ${day} keypoints`,
        probability: 1 / 28,
      }),
      notes: randomizedArray({
        array: [
          {
            time: "9:00",
            note: "leave home for office \n leave a bit late + traffic jam",
          },
          { time: "10:00", note: "arrive at office" },
          {
            time: "12:00",
            note: "have lunch with colleague at department store \n continue with ice cream",
          },
          {
            time: "15:00",
            note: "leave office early, went to the museum \n have dinner at museum food court",
          },
          { time: "18:00", note: "go home" },
        ],
        memoizeKey: `${year} ${month} ${day} notes`,
        probability: 1 / 28,
      }),
    };
  }

  return {
    initialDiaryData,
    diaryData,
    setDiaryData,
    handleDiaryRequestPrevious,
    handleDiaryRequestNext,
  };
}
