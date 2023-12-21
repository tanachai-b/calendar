"use client";
import React from "react";

import { Calendar, useCalendar } from "./Components/Calendar/Calendar";
import { Diary } from "./Components/Diary/Diary";
import { NavBar } from "./Components/NavBar";
import { ToolBar } from "./Components/ToolBar";

export default function Home() {
  const calendar = useCalendar();

  const x = [{ year: 2023, month: 1 }];

  const y: Parameters<typeof Calendar>[0]["data"] = [
    { type: "year", year: 2023 },
    { type: "month", year: 2023, month: 1 },
    { type: "month", year: 2023, month: 2 },
    { type: "year", year: 2024 },
    { type: "month", year: 2024, month: 1 },
    { type: "month", year: 2024, month: 2 },
    { type: "month", year: 2024, month: 3 },
    { type: "month", year: 2024, month: 4 },
  ];

  return (
    <div className="flex flex-col items-stretch h-screen">
      <NavBar />

      <ToolBar onTodayClicked={calendar.goToToday} />

      <div className="grow overflow-hidden flex flex-row items-stretch">
        <Calendar
          className="border-r border-border"
          controller={calendar}
          data={y}
        />

        <Diary className="grow" />
      </div>
    </div>
  );
}
