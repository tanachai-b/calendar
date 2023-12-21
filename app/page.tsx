"use client";
import React from "react";

import { Calendar, useCalendar } from "./Components/Calendar/Calendar";
import { Diary } from "./Components/Diary/Diary";
import { NavBar } from "./Components/NavBar";
import { ToolBar } from "./Components/ToolBar";

export default function Home() {
  const calendar = useCalendar();

  const calendarRawData = [{ year: 2023, month: 1 }];

  const calendarData = [
    { year: 2023, months: [11, 12] },
    { year: 2024, months: [1, 2, 3, 4] },
  ];

  return (
    <div className="flex flex-col items-stretch h-screen">
      <NavBar />

      <ToolBar onTodayClicked={calendar.goToToday} />

      <div className="grow overflow-hidden flex flex-row items-stretch">
        <Calendar
          className="border-r border-border"
          controller={calendar}
          data={calendarData}
        />

        <Diary className="grow" />
      </div>
    </div>
  );
}
