"use client";

import { NavBar } from "../components";
import { Keyboard } from "./Keyboard";
import { ModifiedTextInput } from "./ModifiedTextInput";

export default function KeyboardPage() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="grow">
        <ModifiedTextInput />
      </div>

      <div className="shrink-0 border-t border-border flex flex-row justify-center overflow-auto p-5">
        <Keyboard />
      </div>
    </div>
  );
}
