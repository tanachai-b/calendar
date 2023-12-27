"use client";

import { useState } from "react";

import { NavBar } from "../components";
import { initialInput } from "./initialInput";

export default function Sticky() {
  const [inputText, setInputText] = useState(initialInput);

  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="flex flex-row h-full divide-x divide-border overflow-hidden">
        <div className="flex-1 basis-1/3">
          <textarea
            className="h-full w-full p-2.5 outline-none text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none xfont-mono"
            placeholder="input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className="flex-1 basis-1/3">asdf</div>
      </div>
    </div>
  );
}
