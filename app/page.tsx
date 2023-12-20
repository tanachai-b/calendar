"use client";

import React, { useEffect, useRef } from "react";

import { CalendarBar } from "./Components/Calendar/Calendar";
import { ToolBar } from "./Components/ToolBar";
import { NavBar } from "./Components/NavBar";

export default function Home() {
  const todayRef = useRef(null);

  useEffect(() => {
    if (!todayRef.current) return;
    (todayRef.current as HTMLElement).scrollIntoView({ behavior: "instant" });
  }, []);

  function handleOnTodayClicked() {
    if (!todayRef.current) return;
    (todayRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col items-stretch h-screen">
      <NavBar />

      <ToolBar onTodayClicked={handleOnTodayClicked} />

      <div className="grow overflow-hidden flex flex-row items-stretch">
        <CalendarBar todayRef={todayRef} />

        <div className="grow" />
      </div>
    </div>
  );
}
