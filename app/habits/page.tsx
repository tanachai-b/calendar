"use client";

import { RefObject, createRef, useEffect, useMemo, useState } from "react";
import { NavBar } from "../components";
import { BeautifiedDay } from "./BeautifiedDay";
import { processData, splitDays } from "./dataProcessingUtils";
import { initialData } from "./initialData";

export default function Habits() {
  const [data, setData] = useState(initialData);

  const splitedDays = useMemo(() => splitDays(data), [data]);
  const output = useMemo(() => processData(data), [data]);

  const textareaRefs: RefObject<HTMLTextAreaElement>[] = useMemo(
    () => splitedDays.map(() => createRef()),
    [splitedDays]
  );

  const [focus, setFocus] = useState<{ index: number; selection: number }>();

  useEffect(() => {
    if (!focus) return;
    if (!textareaRefs[focus?.index].current) return;

    const textarea = textareaRefs[focus?.index].current as HTMLTextAreaElement;
    textarea.focus();
    textarea.setSelectionRange(focus.selection, focus.selection);
  }, [focus]);

  async function handleDayChanged(value: string, index: number) {
    const result = [...splitedDays];
    result[index] = value;

    const unformattedData = result.slice(
      Math.max(index - 1, 0),
      Math.min(index + 2, result.length)
    );
    const formattedData = splitDays(unformattedData.join("\n"));

    setData(result.join("\n"));

    if (
      (unformattedData.length === 3 && formattedData.length === 2) ||
      (unformattedData.length === 2 && formattedData.length === 1)
    ) {
      if (textareaRefs[index - 1].current && textareaRefs[index].current) {
        const lastTextarea = textareaRefs[index - 1]
          .current as HTMLTextAreaElement;
        const thisTextarea = textareaRefs[index].current as HTMLTextAreaElement;

        const newSelection =
          lastTextarea.textLength + thisTextarea.selectionStart + 1;

        setFocus({ index: index - 1, selection: newSelection });
      }
    } else if (
      (unformattedData.length === 3 && formattedData.length === 4) ||
      (unformattedData.length === 2 && formattedData.length === 3) ||
      (unformattedData.length === 1 && formattedData.length === 2)
    ) {
      if (textareaRefs[index].current) {
        const thisTextarea = textareaRefs[index].current as HTMLTextAreaElement;

        const oldSelection = thisTextarea.selectionStart;

        await new Promise((resolve) => setTimeout(resolve, 10));

        const newSelection = oldSelection - thisTextarea.textLength - 1;

        setFocus({ index: index + 1, selection: newSelection });
      }
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

        <div className="flex-1 basis-2/3 flex flex-col divide-y divide-border overflow-y-auto overflow-x-hidden">
          {splitedDays.map((day, index) => (
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
