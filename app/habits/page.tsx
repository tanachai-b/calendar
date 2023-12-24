"use client";

import { useMemo, useState } from "react";
import { NavBar } from "../components";
import { monthNames } from "../constants";

export default function Habits() {
  const initialData = `

2023-12-22

> went on a trip

2023-12-23

- sleep at home

2023-12-24

> go to office
> have lunch with colleagues
> go to museum

- 9:00 leave home for office
^ leave a bit late + traffic jam

- 10:00 arrive at office

- 12:00 have lunch with colleague at department store
^ continue with ice cream

- 15:00 leave office early, went to the museum
^ have dinner at museum food court

- 18:00 go home

`.trim();

  const [data, setData] = useState(initialData);

  const output = useMemo(() => processData(data), [data]);

  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="flex flex-row h-full divide-x divide-border overflow-hidden">
        <div className="flex-1 shrink-0">
          <textarea
            className="h-full w-full p-2.5 outline-none text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none"
            placeholder="input"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        {/* <div className="flex-1 shrink-0 p-2.5 whitespace-pre-wrap font-mono overflow-auto text-text_white">
          {JSON.stringify(output, null, 2)}
        </div> */}

        <div className="flex-1 shrink-0 overflow-y-scroll divide-y divide-border">
          {output.map((v, index) => (
            <div className="flex flex-col p-2.5 gap-2.5" key={index}>
              <div className="flex flex-row gap-2.5">
                <div>{v.year}</div>
                <div>
                  {v.month ? monthNames[parseInt(v.month) - 1] : undefined}
                </div>
                <div>{v.day}</div>
              </div>

              {v.keypoints && v.keypoints.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {v.keypoints?.map((v, index) => (
                    <div className="px-1 border border-border" key={index}>
                      {v}
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}

              {v.notes && v.notes.length > 0 ? (
                <div
                  className="grid grid-cols-[min-content_1fr] gap-2.5"
                  key={index}
                >
                  {v.notes?.map((v) => {
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
          ))}
        </div>
      </div>
    </div>
  );
}

function processData(data: string) {
  const splitedDays = splitDays(data);

  const objectDays = splitedDays.map((day) => objectDay(day));

  const splitedParameters = objectDays.map((day) => splitParameters(day));

  const splitedNotes = splitedParameters.map((day) => splitNotes(day));

  return splitedNotes;
}

function splitDays(data: string) {
  return data
    .trim()
    .replace(/^(\d{4}-\d{1,2}-\d{1,2})/gm, "<new_line>$1")
    .split("<new_line>")
    .slice(1)
    .map((value) => value.trim());
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
