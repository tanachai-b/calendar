"use client";

import React from "react";

import { Calendar, useCalendar } from "./Components/Calendar/Calendar";
import { ToolBar } from "./Components/ToolBar";
import { NavBar } from "./Components/NavBar";

export default function Home() {
  const calendar = useCalendar();

  return (
    <div className="flex flex-col items-stretch h-screen">
      <NavBar />

      <ToolBar onTodayClicked={calendar.goToToday} />

      <div className="grow overflow-hidden flex flex-row items-stretch">
        <Calendar controller={calendar} />

        <div className="grow" />
      </div>
    </div>
  );
}
