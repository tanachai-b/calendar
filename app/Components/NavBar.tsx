import React from "react";

import { IconButton } from "./Common/IconButton";
import { Icons } from "./Common/Icons";

export function NavBar() {
  return (
    <div className="flex flex-row px-2.5">
      <IconButton
        icon={Icons.diary_large}
        text="Diary"
        onClick={() => {}}
        active
      />
      <IconButton icon={Icons.habits_large} text="Habits" onClick={() => {}} />
      <div className="grow" />
      <IconButton
        icon={Icons.settings_large}
        text="Settings"
        onClick={() => {}}
      />
    </div>
  );
}
