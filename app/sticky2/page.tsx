"use client";

import { UIEvent, useMemo, useRef, useState } from "react";

import { NavBar } from "../components";
import { initialInput } from "./initialInput";

export default function Sticky() {
  const [inputText, setInputText] = useState(initialInput);
  const lines = useMemo(() => inputText.split("\n"), [inputText]);

  const previewRef = useRef(null);
  const textHeightRef = useRef(null);
  const textInputRef = useRef(null);

  const handleTextScrolled = (e: UIEvent) => {
    const textX = e.target as HTMLElement;
    if (!textX.matches(":hover")) return;

    if (!textHeightRef.current) return;
    const text = textHeightRef.current as HTMLElement;
    const textPositions = getChildPositions(text);
    const textIndex = textPositions.findIndex(
      (v) => v > textX.scrollTop + textX.clientHeight / 2
    );

    if (!previewRef.current) return;
    const preview = previewRef.current as HTMLElement;
    const previewPositions = getChildPositions(preview);
    const previewPosition = previewPositions[textIndex];
    preview.scrollTo({
      top: previewPosition - preview.clientHeight / 2,
    });
  };

  const handlePreviewScrolled = (e: UIEvent) => {
    const preview = e.target as HTMLElement;
    if (!preview.matches(":hover")) return;

    const childPositions = getChildPositions(preview);
    const viewChildIndex = childPositions.findIndex(
      (v) => v > preview.scrollTop + preview.clientHeight / 2
    );

    if (!textHeightRef.current) return;
    const text = textHeightRef.current as HTMLElement;
    const textPositions = getChildPositions(text);
    const textPosition = textPositions[viewChildIndex];

    if (!textInputRef.current) return;
    const scroll = textInputRef.current as HTMLElement;
    scroll.scrollTo({
      top: textPosition - scroll.clientHeight / 2,
    });
  };

  function getChildPositions(parent: HTMLElement) {
    const childHeights = (Array.from(parent.childNodes) as HTMLElement[]).map(
      (v) => v.clientHeight
    );

    const childPositions = childHeights.reduce(
      (prev, curr) => [...prev, prev[prev.length - 1] + curr],
      [0]
    );

    return childPositions;
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="flex flex-row h-full divide-x divide-border overflow-hidden">
        <div
          ref={textInputRef}
          onScroll={handleTextScrolled}
          className="flex-1 text-base overflow-y-auto"
        >
          <div className="relative">
            <textarea
              className="absolute w-full h-full outline-none px-2.5 text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none overflow-hidden"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <div ref={textHeightRef} className="flex flex-col invisible">
              {lines.map((line, index) => (
                <div key={index} className="px-2.5 whitespace-pre-wrap min-h-6">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={previewRef}
          onScroll={handlePreviewScrolled}
          className="flex-1 overflow-y-scroll overflow-x-hidden"
        >
          {lines.map((line, index) => (
            <Format key={index} className="min-h-6" line={line} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Format({ className, line }: { className: string; line: string }) {
  const isMonth =
    line.match(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)/
    ) != null;
  // const isMonth = line.match(/^M\d\d/) != null;

  const isDay = line.match(/^\d.*?:/) != null;

  const isTopic = line.match(/^ *-/) != null;

  const isDetail = line.match(/^ *\^/) != null;

  if (isMonth)
    return (
      <div
        className={`sticky top-0 bg-bg pl-10 text-3xl font-extralight ${className}`}
      >
        {line}
      </div>
    );

  if (isDay) {
    const day = line.match(/^\d.*?(?=:)/);
    const note = line.replace(/^\d.*?:/, "");

    return (
      <div className={className}>
        <div className="pl-2.5 text-2xl font-extralight tabular-nums">
          {day}
        </div>

        <div className="flex flex-row gap-1 pl-12 text-text_white text-base font-light">
          <div>-</div>
          <div>{note}</div>
        </div>
      </div>
    );
  }

  if (isTopic) {
    const note = line.replace(/^ *- */, "");
    return (
      <div
        className={`flex flex-row gap-1 pl-12 text-text_white text-base font-light ${className}`}
      >
        <div>-</div>
        <div>{note}</div>
      </div>
    );
  }

  if (isDetail) {
    const note = line.replace(/^ *\^ */, "");
    return (
      <div className={`flex flex-row gap-1 pl-16 text-sm ${className}`}>
        <div>-</div>
        <div>{note}</div>
      </div>
    );
  }

  return <div className={`pl-2.5 ${className}`}>{line}</div>;
}
