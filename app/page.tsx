"use client";

import React from "react";

import { Calendar } from "./Components/Calendar/Calendar";
import { useCalendarData } from "./Components/Calendar/useCalendarData";
import { Diary } from "./Components/Diary/Diary";
import { useDiaryData } from "./Components/Diary/useDiaryData";
import { NavBar } from "./Components/NavBar";
import { ToolBar } from "./Components/ToolBar";

export default function Home() {
  const {
    initialCalendarData,
    calendarData,
    setCalendarData,
    handleCalendarRequestPrevious,
    handleCalendarRequestNext,
  } = useCalendarData();

  const {
    initialDiaryData,
    diaryData,
    setDiaryData,
    handleDiaryRequestPrevious,
    handleDiaryRequestNext,
  } = useDiaryData();

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
          onDayClick={(year, month, day) => {
            console.log("onDayClick", year, month, day);
          }}
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
