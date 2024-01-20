"use client";

import cx from "classnames";
import { useEffect, useState } from "react";

import { Board, NoteData } from "./Board/Board";
import { sampleData } from "./sampleData";
import { Icon } from "../components";
import { relative } from "path";

export default function StickyPage() {
  const STORAGE_KEY = "sticky_data";

  const [notes, setNotes] = useState<NoteData[]>([]);

  useEffect(() => retrieveStorageOrSampleData(STORAGE_KEY, setNotes), []);

  function handleNotesChange(notes: NoteData[]): void {
    setNotes(notes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes, undefined, 4));
  }

  return (
    <div
      className={cx("h-full", "flex", "flex-col", "select-none")}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* <NavBar className={cx("border-b", "border-highlight-yellow")} /> */}

      <div className={cx("grow", "relative", "size-full", "flex")}>
        <Board
          className={cx("absolute", "size-full")}
          notes={notes}
          onNotesChange={(notes) => handleNotesChange(notes)}
        />

        <ToolBar className={cx("absolute", "size-full")} />
      </div>
    </div>
  );
}

function retrieveStorageOrSampleData(
  STORAGE_KEY: string,
  setNotes: (notes: NoteData[]) => void
) {
  const storage = localStorage.getItem(STORAGE_KEY);

  if (storage) {
    setNotes(JSON.parse(storage));
    return;
  }

  setNotes(sampleData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData, undefined, 4));
}

function ToolBar({ className }: { className?: string } = {}) {
  return (
    <div
      className={cx(
        "flex",
        "items-start",
        "p-x30",
        "pointer-events-none",
        className
      )}
    >
      <div
        className={cx(
          "rounded-full",

          "bg-black-light",
          "bg-opacity-75",

          "border",
          "border-white-dark",
          "border-opacity-25",

          "pointer-events-auto",
          "backdrop-blur-x2"
        )}
      >
        <ToolButton icon="folder_open" text="Open" />
        <ToolButton icon="save" text="Save" />
      </div>
    </div>
  );
}

function ToolButton({
  icon,
  text,
}: {
  icon?: string;
  text?: string;
} = {}) {
  return (
    <div
      className={cx(
        "relative",

        "flex",
        "flex-row",
        "items-center",
        "p-x15",

        "first:pt-x20",
        "first:rounded-t-full",

        "last:pb-x20",
        "last:rounded-b-full",

        "text-white-dark",
        "text-opacity-25",
        "hover:text-opacity-90",

        "transition-all",
        "cursor-pointer",
        "group"
      )}
    >
      <Icon icon={icon} className="text-x30" />
      <div
        className={cx(
          "absolute",
          "left-[70px]",

          "rounded-x7",
          "px-x5",
          "py-x2",

          "text-x15",
          "whitespace-pre",

          "bg-black-light",
          "bg-opacity-75",

          "text-white-dark",
          "opacity-0",
          "group-hover:opacity-100",

          "transition-all",
          "cursor-default",
          "pointer-events-none"
        )}
      >
        {text}
      </div>
    </div>
  );
}
