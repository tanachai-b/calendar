"use client";

import cx from "classnames";
import { useEffect, useState } from "react";

import { Board, NoteData } from "./Board/Board";
import { ToolBar, ToolButton } from "./ToolBar";
import { sampleData } from "./sampleData";
import { NavBar } from "../components";
import { useFileSystemApi } from "./useFileSystemApi";
import { FileName } from "./FileName";

export default function StickyPage() {
  // const STORAGE_KEY = "sticky_data";

  const [notes, setNotes] = useState<NoteData[]>([]);

  const {
    fileHandle,
    isSaving,
    handleNew,
    handleOpen,
    handleSaveAs,
    resetWriteTimer,
  } = useFileSystemApi({ notes, setNotes });

  useEffect(
    () =>
      retrieveStorageOrSampleData(
        // STORAGE_KEY,
        setNotes
      ),
    []
  );

  useEffect(() => {
    window.onbeforeunload = isSaving
      ? () => "There are unsaved changes!"
      : () => {};
  }, [isSaving]);

  async function handleNotesChange(notes: NoteData[]) {
    setNotes(notes);
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(notes, undefined, 4));

    resetWriteTimer(notes);
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

        <ToolBar className={cx("absolute", "size-full")}>
          <ToolButton icon="note_add" text="New" onClick={handleNew} />
          <ToolButton icon="folder_open" text="Open" onClick={handleOpen} />
          <ToolButton icon="save_as" text="Save As" onClick={handleSaveAs} />
        </ToolBar>

        <FileName
          className={cx("absolute", "size-full")}
          fileName={fileHandle?.name}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}

function retrieveStorageOrSampleData(
  // STORAGE_KEY: string,
  setNotes: (notes: NoteData[]) => void
) {
  // const storage = localStorage.getItem(STORAGE_KEY);

  // if (storage) {
  //   setNotes(JSON.parse(storage));
  //   return;
  // }

  setNotes(sampleData);
  // localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData, undefined, 4));
}
