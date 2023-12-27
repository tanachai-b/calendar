"use client";

import { useMemo, useState } from "react";

import { NavBar } from "../components";
import { initialInput } from "./initialInput";

export default function Sticky() {
  const [inputText, setInputText] = useState(initialInput);
  const lines = useMemo(() => inputText.split("\n"), [inputText]);

  function handleLineChanged(index: number, value: string) {
    setInputText(
      [...lines].map((v, i) => (i !== index ? v : value)).join("\n")
    );
  }

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

        <div className="flex-1 basis-2/3 overflow-y-scroll overflow-x-hidden text-sm">
          {lines.map((line, index) => (
            <div key={index} className="flex flex-row divide-x divide-border">
              <div className="flex-1 relative">
                <textarea
                  className="absolute w-full h-full outline-none px-2.5 text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none overflow-hidden"
                  value={line}
                  onChange={(e) => handleLineChanged(index, e.target.value)}
                />

                <div className="px-2.5 whitespace-pre-wrap invisible">
                  {line}
                </div>
              </div>

              <div className="flex-1 overflow-hidden px-2.5 text-wrap min-h-5">
                {format(line)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function format(line: string) {
  const isMonth =
    line.match(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)/
    ) != null;

  const isDay = line.match(/^\d.*?:/) != null;

  const isTopic = line.match(/^ *-/) != null;

  const isDetail = line.match(/^ *\^/) != null;

  if (isMonth)
    return <div className="pl-10 text-3xl font-extralight">{line}</div>;

  if (isDay) {
    const day = line.match(/^\d.*?(?=:)/);
    const note = line.replace(/^\d.*?:/, "");

    return (
      <>
        <div className="text-2xl font-extralight">{day}</div>

        <div className="flex flex-row gap-1 pl-10 text-text_white text-base font-light">
          <div>-</div>
          <div>{note}</div>
        </div>
      </>
    );
  }

  if (isTopic) {
    const note = line.replace(/^ *- */, "");
    return (
      <>
        <div className="flex flex-row gap-1 pl-10 text-text_white text-base font-light">
          <div>-</div>
          <div>{note}</div>
        </div>
      </>
    );
  }

  if (isDetail) {
    const note = line.replace(/^ *\^ */, "");
    return (
      <>
        <div className="flex flex-row gap-1 pl-14 text-sm">
          <div>-</div>
          <div>{note}</div>
        </div>
      </>
    );
  }

  return line;
}
