"use client";
import React from "react";

import { Calendar, useCalendar } from "./Components/Calendar/Calendar";
import { Diary } from "./Components/Diary/Diary";
import { NavBar } from "./Components/NavBar";
import { ToolBar } from "./Components/ToolBar";

export default function Home() {
  const calendar = useCalendar();

  return (
    <div className="flex flex-col items-stretch h-screen">
      <NavBar />

      <ToolBar onTodayClicked={calendar.goToToday} />

      <div className="grow overflow-hidden flex flex-row items-stretch">
        <Calendar controller={calendar} className="border-r border-border" />

        <Diary className="grow" />
      </div>
    </div>
  );
}
