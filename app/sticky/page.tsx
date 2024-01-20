"use client";

import cx from "classnames";
import { useEffect, useState } from "react";

import { Board, NoteData } from "./Board/Board";
import { sampleData } from "./sampleData";

export default function StickyPage() {
  const STORAGE_KEY = "sticky_data";

  const [notes, setNotes] = useState<NoteData[]>([]);

  useEffect(() => retrieveStorageOrSampleData(STORAGE_KEY, setNotes), []);

  function handleNotesChange(notes: NoteData[]): void {
    setNotes(notes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes, undefined, 4));
  }

  return (
    <div className={cx("h-full", "flex", "flex-col")}>
      {/* <NavBar className={cx("border-b", "border-highlight-yellow")} /> */}

      <Board
        className={cx("grow")}
        notes={notes}
        onNotesChange={(notes) => handleNotesChange(notes)}
      />
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
