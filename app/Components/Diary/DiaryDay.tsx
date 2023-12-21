"use client";
import React from "react";

const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function DiaryDay({
  day,
  weekday,
  keypoints = [],
  notes = [],
}: {
  day: number;
  weekday: number;
  keypoints?: string[];
  notes?: { time: string; note: string }[];
}) {
  return (
    <div className="p-2.5 grid grid-cols-[2.5rem_1fr] gap-x-2.5 gap-y-1">
      <div
        className={`text-right text-xl font-extralight tabular-nums ${
          weekday === 0 ? "text-text_red" : "text-text_white"
        }`}
      >
        {day}
      </div>
      <div
        className={`flex items-center ${weekday === 0 ? "text-text_red" : ""}`}
      >
        {weekdayNames[weekday]}
      </div>

      <div />
      <div className="flex flex-row gap-1">
        {keypoints.map((keypoint, index) => (
          <div
            key={index}
            className="rounded px-1 bg-highlight_yellow text-bg font-medium"
          >
            {keypoint}
          </div>
        ))}
      </div>

      {notes.map((note) => (
        <>
          <div className="text-right">{note.time}</div>
          <div className="whitespace-pre-line">{note.note}</div>
        </>
      ))}
    </div>
  );
}
