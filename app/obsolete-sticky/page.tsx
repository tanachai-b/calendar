"use client";

import { useMemo, useState } from "react";

import { NavBar } from "../components";
import { StickyMonth } from "./StickyMonth";
import { initialInput } from "./initialInput";
import { objectsToText } from "./objectsToTextUtils";
import { textToObjects, textToObjectsAAA } from "./textToObjectsUtils";

export default function Sticky() {
  const [inputText, setInputText] = useState(initialInput);

  const monthObjects = useMemo(() => textToObjects(inputText), [inputText]);
  const objectsBackToText = useMemo(
    () => objectsToText(monthObjects),
    [monthObjects]
  );

  const splittedDays = useMemo(() => textToObjectsAAA(inputText), [inputText]);

  return (
    <div className="flex flex-col h-full">
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

        {/* <div className="flex-1 basis-1/3 p-2.5 whitespace-pre font-mono overflow-auto text-text_grey">
          {JSON.stringify(monthObjects, null, 2)}
        </div>

        <div className="flex-1 basis-1/3 p-2.5 whitespace-pre overflow-auto text-text_grey">
          {objectsBackToText}
        </div> */}

        <div className="flex-1 basis-1/3 flex flex-col overflow-y-scroll">
          {monthObjects.map(({ month, days }, index) => (
            <StickyMonth key={index} month={month} days={days} />
          ))}
        </div>

        {/* <div className="flex-1 basis-2/3 flex flex-col overflow-y-scroll">
          {monthObjects.map(({ month, days }, index) => (
            <StickyMonth
              key={index}
              month={month}
              days={days}
              editor={(dayIndex) => (
                <div className="p-2.5 whitespace-pre-wrap">
                  {splittedDays[index].days[dayIndex]}
                </div>
              )}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
