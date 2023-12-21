"use client";

import React from "react";

import { DiaryDay } from "./DiaryDay";
import { monthNames } from "../../constants";

export function Diary({ className }: { className: string }) {
  return (
    <div className={`overflow-auto hixde-scroll ${className}`}>
      {[2023, 2024].map((year) => (
        <DiaryYear key={year} year={year} />
      ))}
    </div>
  );
}

function DiaryYear({ year }: { year: number }) {
  return (
    <>
      <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight text-text_white p-2.5 pb-0">
        {year}
      </div>

      {Array.from({ length: 12 }, (_value, index) => (
        <DiaryMonth key={index} year={year} month={index + 1} />
      ))}
    </>
  );
}

function DiaryMonth({ year, month }: { year: number; month: number }) {
  const daysInMonth = new Date(year, month, 0).getDate();

  return (
    <div>
      <div className="sticky top-[36px] bg-bg text-center text-base font-light text-text_white p-2.5 pb-0">
        {monthNames[month - 1]}
      </div>

      {Array.from({ length: daysInMonth }, (_value, index) => {
        const x = Math.random();

        return (
          <DiaryDay
            key={index}
            day={index + 1}
            weekday={new Date(year, month - 1, index + 1).getDay()}
            {...(x < 0
              ? {
                  keypoints: [
                    "went to office",
                    "had dinner with colleagues",
                    "went on a trip",
                  ],
                  notes: [
                    { time: "9:00", note: "leave home \n leave a bit late" },
                    { time: "10:00", note: "arrive at office" },
                    { time: "15:00", note: "went on a trip \n have fun" },
                  ],
                }
              : {})}
          />
        );
      })}
    </div>
  );
}
