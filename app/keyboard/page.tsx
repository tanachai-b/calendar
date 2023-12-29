"use client";

import { NavBar } from "../components";
import { Keyboard } from "./Keyboard";

export default function KeyboardPage() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <TextInput />

      <div className="border-t border-border flex flex-row justify-center overflow-auto p-5">
        <Keyboard />
      </div>
    </div>
  );
}

function TextInput() {
  return <div className="grow">TextInput</div>;
}
