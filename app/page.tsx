"use client";

import React, { useEffect, useRef } from "react";

import { CalendarBar } from "./Components/Calendar/Calendar";
import { MenuBar } from "./Components/MenuBar";

export default function Home() {
  const todayRef = useRef(null);

  useEffect(() => {
    if (!todayRef.current) return;
    (todayRef.current as HTMLElement).scrollIntoView();
  }, []);

  function handleOnTodayClicked() {
    if (!todayRef.current) return;
    (todayRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col items-stretch h-screen">
      <MenuBar onTodayClicked={handleOnTodayClicked} onEditClicked={() => {}} />

      <div className="grow overflow-hidden flex flex-row items-stretch">
        <CalendarBar todayRef={todayRef} />

        <div className="grow"></div>
      </div>
    </div>
  );
}
