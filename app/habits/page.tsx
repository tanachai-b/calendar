"use client";

import { NavBar } from "../components/NavBar";

export default function Habits() {
  const data = `
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
  `;

  console.log("data::\n", data.trim());

  const splitedDays = data
    .trim()
    .replace(/^(\d{4}-\d{2}-\d{2})/gm, "[NEW-LINE-29384]$1")
    .split("[NEW-LINE-29384]")
    .slice(1)
    .map((value) => value.trim());

  console.log("splitedDays::\n", splitedDays.toString());

  const processedDays = splitedDays.map((day) =>
    splitEachNotes(splitKeypointsAndNotes(objectizeDay(day)))
  );

  console.log("proc::\n", processedDays);

  function objectizeDay(day: string) {
    const addedNewLineBeforeKeypoints = day.replace(
      /(^>)/m,
      "[NEW-LINE-29384]$1"
    );
    const addedNewLineBeforeNotes = addedNewLineBeforeKeypoints.replace(
      /(^-)/m,
      "[NEW-LINE-29384]$1"
    );
    const splitted: string[] = addedNewLineBeforeNotes
      .split("[NEW-LINE-29384]")
      .map((value) => value.trim());

    console.log("day::\n", splitted.toString());

    return {
      date: splitted[0],
      keypoints: splitted.find((v) => v.charAt(0) === ">"),
      notes: splitted.find((v) => v.charAt(0) === "-"),
    };
  }

  function splitKeypointsAndNotes({
    date,
    keypoints,
    notes,
  }: {
    date: string;
    keypoints?: string;
    notes?: string;
  }) {
    const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
    return {
      year: date.replace(dateRegex, "$1"),
      month: date.replace(dateRegex, "$2"),
      day: date.replace(dateRegex, "$3"),
      keypoints: keypoints?.split("\n").map((v) => v.replace(/^>/, "").trim()),
      notes: notes
        ?.split(/^-/gm)
        .slice(1)
        .map((v) => v.replace(/^\^ */gm, "").trim()),
    };
  }

  function splitEachNotes({
    year,
    month,
    day,
    keypoints,
    notes,
  }: {
    year: string;
    month: string;
    day: string;
    keypoints?: string[];
    notes?: string[];
  }) {
    return {
      year,
      month,
      day,
      keypoints,
      notes: notes?.map((v) => {
        const vv = v
          .replace(/^(\d+:\d+)((.|\n)*)/, "$1[NEW-LINE-29384]$2")
          .trim();

        return {
          time: vv.replace(/(.*)\[NEW-LINE-29384\]((.|\n)*)/, "$1").trim(),
          note: vv.replace(/(.*)\[NEW-LINE-29384\]((.|\n)*)/, "$2").trim(),
        };
      }),
    };
  }

  const xv = "asdf asdov".replace(/(poipo)(asdf asdov)/, "$1");
  console.log(xv);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
    </div>
  );
}
