"use client";

import { useState } from "react";

import { NavBar } from "../components";
import { initialInput } from "./initialInput";

export default function Sticky() {
  const [inputText, setInputText] = useState(initialInput);

  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="flex flex-row h-full divide-x divide-border overflow-hidden text-base">
        <textarea
          className="flex-1 w-full h-full outline-none px-2.5 text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <textarea
          className="flex-1 w-full h-full outline-none px-2.5 text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none"
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

  const block: string[][][] = [];

  table.forEach((row, y) =>
    row.forEach((column, x) => {
      if (x === 0 && column.length > 0) {
        block.push([]);
      }

      if (column.length === 0) return;
      if (column === "x") return;

      const blockRow = block[block.length - 1] ?? [];

      if (blockRow[Math.floor(x / blockSize)] == null) {
        blockRow[Math.floor(x / blockSize)] = [];
      }

      blockRow[Math.floor(x / blockSize)].push(column);
    })
  );

  return block.reduce((prev, curr) => [...prev, ...curr], []);
}

function textize(days: string[][]) {
  const filtered = days.filter((v) => v.length > 1);
  const marked = filtered.map((day) =>
    day.map((comment, index) => {
      if (index === 0) {
        return `${comment}:`;
      } else {
        return `- ${comment}`;
      }
    })
  );
  return marked.map((day) => day.join("\n")).join("\n\n");
}
