"use client";

import React, { useEffect, useRef } from "react";

import { IconButton } from "./Components/IconButton";
import { Icons } from "./Components/Icons";
import { LeftBar } from "./Components/LeftBar/LeftBar";

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
        <LeftBar todayRef={todayRef} />

        <div className="grow"></div>
      </div>
    </div>
  );
}

function MenuBar({
  onTodayClicked,
  onEditClicked,
}: {
  onTodayClicked: () => void;
  onEditClicked: () => void;
}) {
  return (
    <div className="flex flex-row border-b border-yellow px-3">
      <IconButton icon={Icons.calendar} text="Today" onClick={onTodayClicked} />
      <IconButton icon={Icons.edit} text="Edit" onClick={onEditClicked} />
    </div>
  );
}
