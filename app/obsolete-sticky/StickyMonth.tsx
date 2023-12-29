import { StickyDay } from "./StickyDay";
import { monthNames } from "../constants";
import { getWeekday } from "../utils";
import React, { ReactNode } from "react";

export function StickyMonth({
  month,
  days,
  editor,
}: {
  month?: number;
  days: {
    day?: number;
    notes?: {
      topic: string;
      details: string[];
    }[];
  }[];
  editor?: (index: number) => ReactNode;
}) {
  return (
    <div>
      {month != null ? (
        <div
          className={`sticky top-0 z-50 bg-bg flex flex-row p-2.5 pl-12 mt-10 mb-5 text-3xl font-extralight ${
            editor ? "w-[50%]" : ""
          }`}
        >
          <div className="grow">{monthNames[month - 1]}</div>
          <div>2023</div>
        </div>
      ) : (
        <></>
      )}

      {days.map(({ day, notes }, index) => (
        <div key={index} className="flex flex-row">
          <StickyDay
            className="flex-1"
            day={day}
            weekday={
              month != null && day != null
                ? getWeekday(2023, month, day)
                : undefined
            }
            notes={notes}
          />

          {editor ? <div className="flex-1">{editor?.(index)}</div> : <></>}
        </div>
      ))}
    </div>
  );
}
