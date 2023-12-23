"use client";

import React from "react";

import {
  Calendar,
  useCalendarController,
} from "./Components/Calendar/Calendar";
import { useCalendarData } from "./Components/Calendar/useCalendarData";
import { Diary, useDiaryController } from "./Components/Diary/Diary";
import { useDiaryData } from "./Components/Diary/useDiaryData";
import { NavBar } from "./Components/NavBar";
import { ToolBar } from "./Components/ToolBar";

export default function Home() {
  const {
    initialCalendarData,
    calendarData,
    setCalendarData,
    handleCalendarRequestPrevious,
    handleCalendarRemovePrevious,
    handleCalendarRequestNext,
    handleCalendarRemoveNext,
  } = useCalendarData();

  const calendarController = useCalendarController({
    data: calendarData,
    onRequestPrevious: handleCalendarRequestPrevious,
    onRemovePrevious: handleCalendarRemovePrevious,
    onRequestNext: handleCalendarRequestNext,
    onRemoveNext: handleCalendarRemoveNext,
  });

  const {
    initialDiaryData,
    diaryData,
    setDiaryData,
    handleDiaryRequestPrevious,
    handleDiaryRemovePrevious,
    handleDiaryRequestNext,
    handleDiaryRemoveNext,
  } = useDiaryData();

  const diaryController = useDiaryController({
    data: diaryData,
    onRequestPrevious: handleDiaryRequestPrevious,
    onRemovePrevious: handleDiaryRemovePrevious,
    onRequestNext: handleDiaryRequestNext,
    onRemoveNext: handleDiaryRemoveNext,
  });

  async function handleTodayClicked() {
    calendarController.scrollToToday(() =>
      setCalendarData(initialCalendarData)
    );

    diaryController.scrollToToday(() => setDiaryData(initialDiaryData));
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />

      <ToolBar onTodayClicked={handleTodayClicked} />

      <div className="grow flex flex-row overflow-hidden">
        <Calendar
          className="shrink-0 border-r border-border"
          controller={calendarController}
          onDayClick={(year, month, day) => {
            console.log("onDayClick", year, month, day);
          }}
        />

        <Diary className="grow" controller={diaryController} />
      </div>
    </div>
  );
}
