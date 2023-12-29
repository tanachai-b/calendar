"use client";

import { NavBar, ToolBar } from "../components";
import { Calendar, useCalendarController, useCalendarData } from "./Calendar";
import { Diary, useDiaryController, useDiaryData } from "./Diary";

export default function Home() {
  const {
    initialCalendarData,
    calendarData,
    setCalendarData,
    handleCalendarRequestPrevious,
    handleCalendarRemovePrevious,
    handleCalendarRequestNext,
    handleCalendarRemoveNext,
    generateCalendarData,
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
    generateDiaryData,
  } = useDiaryData();

  const diaryController = useDiaryController({
    data: diaryData,
    onRequestPrevious: handleDiaryRequestPrevious,
    onRemovePrevious: handleDiaryRemovePrevious,
    onRequestNext: handleDiaryRequestNext,
    onRemoveNext: handleDiaryRemoveNext,
    onScrollEnd: handleDiaryScrollEnd,
  });

  async function handleTodayClicked() {
    setCalendarData([]);
    calendarController.setData(() => setCalendarData(initialCalendarData));

    setDiaryData([]);
    diaryController.setData(() => setDiaryData(initialDiaryData));
  }

  function handleDayClick(year: number, month: number, day: number) {
    setDiaryData([]);
    diaryController.setData(() =>
      setDiaryData([generateDiaryData(year, month, day)])
    );
  }

  function handleDiaryScrollEnd(year: number, month: number) {
    setCalendarData([]);
    calendarController.setData(() =>
      setCalendarData([generateCalendarData(year, month)])
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <ToolBar
        className="border-b border-highlight_yellow"
        onTodayClicked={handleTodayClicked}
      />

      <div className="grow flex flex-row overflow-hidden">
        <Calendar
          className="shrink-0 border-r border-border"
          controller={calendarController}
          onDayClick={handleDayClick}
        />

        <Diary className="grow" controller={diaryController} />
      </div>
    </div>
  );
}
