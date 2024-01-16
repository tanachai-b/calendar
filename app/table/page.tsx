"use client";

import { useState } from "react";

import { NavBar } from "../components";
import { initialInput } from "./initialInput";

export default function Sticky() {
  const [inputText, setInputText] = useState(initialInput);

  return (
    <div className="flex flex-col h-full">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="flex flex-row h-full divide-x divide-border overflow-hidden text-base">
        <textarea
          className="flex-1 w-full h-full outline-none px-2.5 text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <textarea
          className="flex-1 w-full h-full outline-none px-2.5 text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none"
          // value={JSON.stringify(blockize(tabularize(inputText)), null, 2)}
          value={textize(blockize(tabularize(inputText)))}
        />
      </div>
    </div>
  );
}

function tabularize(text: string) {
  return text.split("\n").map((v) => v.split("\t"));
}

function blockize(table: string[][]) {
  const blockSize = 10;

  const weeks: string[][][] = [];

  let commentRow = -1;
  table.forEach((row, y) => {
    commentRow++;

    return row.forEach((cell, x) => {
      if ((x === 0 && y === 0) || (x === 0 && cell.length > 0)) {
        weeks.push([]);
        commentRow = 0;
      }
      const currentWeek = weeks[weeks.length - 1];

      const dayInWeek = Math.floor(x / blockSize);
      if (currentWeek[dayInWeek] == null) currentWeek[dayInWeek] = [];
      const currentDay = currentWeek[dayInWeek];

      if (currentDay[commentRow] == null) currentDay[commentRow] = "";

      if (cell.length === 0) return;
      if (cell.toLowerCase() === "x") return;

      if (currentDay[commentRow] === "") {
        currentDay[commentRow] = cell;
      } else {
        currentDay[commentRow] += "%%%" + cell;
      }
    });
  });

  return weeks
    .reduce((prev, curr) => [...prev, ...curr], [])
    .map((v) => combineFirstRows(combineBlanks(trim(v))))
    .filter((v) => v.length > 0)
    .filter((v) => !(v.length === 1 && (v[0].match(/^\d+$/)?.length ?? 0) > 0));
}

function trim(array: string[]) {
  let result = [...array];

  while (result.length > 0 && result[0].length === 0) {
    result = result.slice(1);
  }

  while (result.length > 0 && result[result.length - 1].length === 0) {
    result = result.slice(0, -1);
  }

  return result;
}

function combineBlanks(array: string[]) {
  return array
    .reduce<string[]>((prev, curr) => {
      if (
        prev.length > 1 &&
        prev[prev.length - 1].length === 0 &&
        curr.length === 0
      ) {
        return [...prev];
      } else {
        return [...prev, curr];
      }
    }, [])
    .filter((v, i) => (i === 1 && v.length === 0 ? false : true));
}

function combineFirstRows(array: string[]) {
  return array
    .reduce<string[]>((prev, curr, index) => {
      if (prev.length === 1 && curr.length === 0) {
        return [prev[0]];
      } else if (index === 1) {
        return [`${prev[0]}: ${curr}`];
      } else {
        return [...prev, curr];
      }
    }, [])
    .filter((v, i) => (i === 1 && v.length === 0 ? false : true));
}

function textize(days: string[][]) {
  const marked = days.map((day) =>
    day.map((comment, index) => {
      const trimmed = comment.trim().replace(/\s+/g, " ");
      if (comment.length > 0) {
        if (index === 0) {
          return trimmed;
        } else if (trimmed.charAt(0) === "^") {
          return trimmed;
        } else {
          return `- ${trimmed}`;
        }
      } else {
        return "";
      }
    })
  );
  return marked.map((day) => day.join("\n")).join("\n\n");
}
