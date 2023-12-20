"use client";

import React from "react";

import { IconButton } from "./Common/IconButton";
import { Icons } from "./Common/Icons";

export function MenuBar({
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
