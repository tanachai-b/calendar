"use client";

import { RefObject, createRef, useEffect, useMemo, useState } from "react";
import { NavBar } from "../components";
import { BeautifiedDay } from "./BeautifiedDay";
import {
  isDayGotMergedToPrevious,
  isDayGotSplitted,
  setCursorOnNewTextarea,
  setCursorOnPrevTextarea,
} from "./cursorCalculationUtils";
import { initialData } from "./initialData";
import { toText } from "./objectToTextUtils";
import { processData, splitDays } from "./textToObjectUtils";

export default function Habits() {
  const [data, setData] = useState(initialData);

  const splittedDays = useMemo(() => splitDays(data), [data]);
  const output = useMemo(() => processData(data), [data]);
  const outputToText = useMemo(() => toText(output), [output]);

  const textareaRefs: RefObject<HTMLTextAreaElement>[] = useMemo(
    () => splittedDays.map(() => createRef()),
    [splittedDays]
  );

  const [cursor, setCursor] = useState<{ index: number; selection: number }>();

  useEffect(() => {
    if (!cursor) return;
    if (!textareaRefs[cursor?.index].current) return;

    const textarea = textareaRefs[cursor?.index].current as HTMLTextAreaElement;
    textarea.focus();
    textarea.setSelectionRange(cursor.selection, cursor.selection);
  }, [cursor]);

  function handleDayChanged(value: string, index: number) {
    const updatedDays = splittedDays.map((v, i) => (i === index ? value : v));

    setData(updatedDays.join("\n"));

    const baseline = updatedDays.slice(
      Math.max(index - 1, 0),
      Math.min(index + 2, updatedDays.length)
    );
    const resplittedDays = splitDays(baseline.join("\n"));

    if (isDayGotMergedToPrevious(baseline, resplittedDays)) {
      setCursorOnPrevTextarea(textareaRefs, index, setCursor);
    } else if (isDayGotSplitted(baseline, resplittedDays)) {
      setCursorOnNewTextarea(textareaRefs, index, setCursor);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="flex flex-row h-full divide-x divide-border overflow-hidden">
        <div className="flex-1 basis-1/3">
          <textarea
            className="h-full w-full p-2.5 outline-none text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none font-mono"
            placeholder="input"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        {/* <div className="flex-1 basis-1/3 p-2.5 whitespace-pre-wrap font-mono overflow-auto text-text_grey">
          {JSON.stringify(output, null, 2)}
        </div> */}

        {/* <div className="flex-1 basis-1/3 p-2.5 whitespace-pre-wrap font-mono overflow-auto text-text_grey">
          {outputToText}
        </div> */}

        {/* <div className="flex-1 basis-1/3 flex flex-col overflow-y-scroll divide-y divide-border">
          {output.map((day, index) => (
            <BeautifiedDay
              key={index}
              year={day.year}
              month={day.month}
              day={day.day}
              keypoints={day.keypoints}
              notes={day.notes}
            />
          ))}
        </div> */}

        <div
          className="flex-1 basis-2/3 flex flex-col divide-y divide-border overflow-y-auto overflow-x-hidden"
          onBlur={(e) => {
            if (e.relatedTarget === null) setData(outputToText);
          }}
        >
          {splittedDays.map((day, index) => (
            <div className="flex flex-row divide-x divide-border" key={index}>
              <div className="flex-1">
                <BeautifiedDay
                  year={output[index].year}
                  month={output[index].month}
                  day={output[index].day}
                  keypoints={output[index].keypoints}
                  notes={output[index].notes}
                />
              </div>

              <div className="flex-1 relative">
                <textarea
                  ref={textareaRefs[index]}
                  className="peer absolute h-full w-full p-2.5 outline-none text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none overflow-hidden font-mono"
                  placeholder="input"
                  value={day}
                  onChange={(e) => handleDayChanged(e.target.value, index)}
                />

                <div className="flex-1 p-2.5 whitespace-pre-wrap invisible hxidden peer-focus:block">
                  {day}
                  {"\n"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
