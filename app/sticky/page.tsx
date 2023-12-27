"use client";

import {
  FocusEvent,
  RefObject,
  createRef,
  useEffect,
  useMemo,
  useState,
} from "react";

import { NavBar } from "../components";
import {
  isDayGotMergedToPrevious,
  isDayGotSplitted,
  setCursorOnNewTextarea,
  setCursorOnPrevTextarea,
} from "./cursorCalculationUtils";
import { initialInput } from "./initialInput";
import { objectsToText } from "./objectsToTextUtils";
import { splitDays, textToObjects } from "./textToObjectsUtils";
import { weekdayNames } from "../constants";
import { StickyMonth } from "./StickyMonth";

export default function Sticky() {
  const [inputText, setInputText] = useState(initialInput);

  const monthObjects = useMemo(() => textToObjects(inputText), [inputText]);
  // const objectsBackToText = useMemo(
  //   () => objectsToText(dayObjects),
  //   [dayObjects]
  // );

  const splittedDays = useMemo(() => splitDays(inputText), [inputText]);
  const textareaRefs: RefObject<HTMLTextAreaElement>[] = useMemo(
    () => splittedDays.map(() => createRef()),
    [splittedDays]
  );

  const [cursor, setCursor] = useState<{ index: number; selection: number }>();

  useEffect(() => {
    if (!cursor) return;
    if (!textareaRefs[cursor?.index]?.current) return;

    const textarea = textareaRefs[cursor?.index].current as HTMLTextAreaElement;
    textarea.focus();
    textarea.setSelectionRange(cursor.selection, cursor.selection);
  }, [cursor]);

  // function handleDayTextChanged(value: string, index: number) {
  //   const updatedDays = splittedDays.map((v, i) => (i === index ? value : v));

  //   setInputText(updatedDays.join("\n"));

  //   const baseline = updatedDays.slice(
  //     Math.max(index - 1, 0),
  //     Math.min(index + 2, updatedDays.length)
  //   );
  //   const resplittedDays = splitDays(baseline.join("\n"));

  //   if (isDayGotMergedToPrevious(baseline, resplittedDays)) {
  //     setCursorOnPrevTextarea(textareaRefs, index, setCursor);
  //   } else if (isDayGotSplitted(baseline, resplittedDays)) {
  //     setCursorOnNewTextarea(textareaRefs, index, setCursor);
  //   }
  // }

  // function handleDayTextBlurred(e: FocusEvent) {
  //   if ((e as FocusEvent).relatedTarget === null) {
  //     setInputText(objectsBackToText);
  //   }
  // }

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

        {/* <div className="flex-1 basis-1/3 p-2.5 whitespace-pre font-mono overflow-auto text-text_grey">
          {JSON.stringify(dayObjects, null, 2)}
        </div> */}

        {/* <div className="flex-1 basis-1/3 p-2.5 whitespace-pre-wrap font-mono overflow-auto text-text_grey">
          {objectsBackToText}
        </div> */}

        <div className="flex-1 basis-1/3 flex flex-col overflow-y-scroll">
          {monthObjects.map(({ month, days }, index) => (
            <StickyMonth key={index} month={month} days={days} />
          ))}
        </div>

        {/* <div
          className="flex-1 basis-2/3 flex flex-col xdivide-y divide-border overflow-y-auto overflow-x-hidden"
          onBlur={handleDayTextBlurred}
        >
          {splittedDays.map((day, index) => (
            <div className="flex flex-row divide-x divide-border" key={index}>
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRefs[index]}
                  className="peer absolute h-full w-full p-2.5 outline-none text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none overflow-hidden font-mono border-b border-border"
                  placeholder="input"
                  value={day}
                  onChange={(e) => handleDayTextChanged(e.target.value, index)}
                />

                <div className="flex-1 p-2.5 whitespace-pre-wrap invisible xhidden peer-focus:block">
                  {day}
                  {"\n"}
                </div>
              </div>

              <div className="flex-1 xborder-b border-border">
                <BeautifiedDay
                  year={dayObjects[index].year}
                  month={dayObjects[index].month}
                  day={dayObjects[index].day}
                  keypoints={dayObjects[index].keypoints}
                  notes={dayObjects[index].notes}
                />
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
