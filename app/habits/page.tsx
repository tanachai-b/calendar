"use client";

import { useMemo, useState } from "react";
import { NavBar } from "../components";
import { monthNames } from "../constants";
import { initialData } from "./initialData";

export default function Habits() {
  const [data, setData] = useState(initialData);

  const splitedDays = useMemo(() => splitDays(data), [data]);
  const output = useMemo(() => processData(data), [data]);

  function handleDayChanged(value: string, index: number) {
    const result = [...splitedDays];
    result[index] = value;
    setData(result.join("\n"));
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="flex flex-row h-full divide-x divide-border overflow-hidden">
        <div className="flex-1 basis-1/3">
          <textarea
            className="h-full w-full p-2.5 outline-none text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none"
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
                  className="peer absolute h-full w-full p-2.5 outline-none text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none overflow-hidden"
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

  function BeautifiedDay({
    year,
    month,
    day,
    keypoints,
    notes,
  }: {
    year?: string;
    month?: string;
    day?: string;
    keypoints?: string[];
    notes?: { time?: string; note?: string }[];
  }) {
    return (
      <div className="flex flex-col p-2.5 gap-2.5">
        <div>
          <span>{year} </span>
          <span>{month ? monthNames[parseInt(month) - 1] : undefined} </span>
          <span>{day}</span>
        </div>

        {keypoints && keypoints.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {keypoints?.map((v, index) => (
              <div className="px-1 border border-border" key={index}>
                {v}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}

        {notes && notes.length > 0 ? (
          <div className="grid grid-cols-[min-content_1fr] gap-2.5">
            {notes?.map((v) => {
              return (
                <>
                  <div className="text-right">{v.time}</div>
                  <div className="whitespace-pre-wrap">{v.note}</div>
                </>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

function processData(data: string) {
  const splitedDays = splitDays(data);

  const objectDays = splitedDays.map((day) => objectDay(day));

  const splitedParameters = objectDays.map((day) => splitParameters(day));

  const splitedNotes = splitedParameters.map((day) => splitNotes(day));

  return splitedNotes;
}

function splitDays(data: string) {
  return (
    data
      // .trim()
      .replace(/\n(\d{4}-\d{1,2}-\d{1,2})/gm, "<new_line>$1")
      .split("<new_line>")
    // .slice(1)
  );
  // .map((value) => value.trim());
}

function objectDay(day: string) {
  return {
    date: day.match(/^\d{4}-\d{1,2}-\d{1,2}/)?.[0],
    keypoints: day.replace(/^-.*/ms, "").match(/^>.*/ms)?.[0].trim(),
    notes: day.match(/^-.*/ms)?.[0].trim(),
  };
}

function splitParameters({
  date,
  keypoints,
  notes,
}: {
  date?: string;
  keypoints?: string;
  notes?: string;
}) {
  return {
    year: date?.split("-")[0],
    month: date?.split("-")[1],
    day: date?.split("-")[2],
    keypoints: keypoints
      ?.split(/^>/gm)
      .slice(1)
      .map((v) => v.trim()),
    notes: notes
      ?.split(/^-/gm)
      .slice(1)
      .map((v) => v.replace(/^\^ */gm, "").trim()),
  };
}

function splitNotes({
  year,
  month,
  day,
  keypoints,
  notes,
}: {
  year?: string;
  month?: string;
  day?: string;
  keypoints?: string[];
  notes?: string[];
}) {
  return {
    year,
    month,
    day,
    keypoints,
    notes: notes?.map((note) => ({
      time: note.match(/^~?\d{1,2}:\d{1,2}/)?.[0],
      note: note
        .substring(note.match(/^~?\d{1,2}:\d{1,2}/)?.[0]?.length ?? 0)
        .trim(),
    })),
  };
}
