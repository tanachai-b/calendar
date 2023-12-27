"use client";

import { UIEvent, useMemo, useRef, useState } from "react";

import { NavBar } from "../components";
import { initialInput } from "./initialInput";

export default function Sticky() {
  const [inputText, setInputText] = useState(initialInput);

  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="flex flex-row h-full divide-x divide-border overflow-hidden">
        <textarea
          className="flex-1 w-full h-full outline-none px-2.5 text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="flex-1 whitespace-pre">{convert(inputText)}</div>
      </div>
    </div>
  );
}

function convert(text: string) {
  const x = text.split("\n").map((v) => v.split("\t"));
  return JSON.stringify(x, null, 2);
}
