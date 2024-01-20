import cx from "classnames";
import { MouseEvent, useState } from "react";

import { Note } from "../Note/Note";
import { Backdrop } from "./Backdrop";
import { useInScreenNotes } from "./useInScreenNotes";
import { useHandleMouse } from "./useHandleMouse";
import { useGetNewNote } from "./useGetNewNote";

export type NoteData = {
  text: string;
  color: number;
  x: number;
  y: number;
  rotate: number;
  key: string;
};

export function Board({
  className,
  notes = [],
  onNotesChange,
}: {
  className?: string;
  notes?: NoteData[];
  onNotesChange?: (notes: NoteData[]) => void;
} = {}) {
  const { boardRef, inScreenNotes, boardSize } = useInScreenNotes(notes);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    isNoteMouseDown,
    handleNoteMouseDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useHandleMouse(notes, isEditing, setIsEditing, onNotesChange);

  function handleTextChange(text: string): void {
    onNotesChange?.([
      ...notes.slice(0, -1),
      { ...notes[notes.length - 1], text },
    ]);
  }

  function handleColorChange(color: number): void {
    onNotesChange?.([
      ...notes.slice(0, -1),
      { ...notes[notes.length - 1], color },
    ]);
    setIsEditing(false);
  }

  function handleBoardDoubleClick(x: number, y: number) {
    addNote(x, y);
  }

  function handleBoardMouseDown(e: MouseEvent) {
    const { button, clientX, clientY } = e;
    if (button === 0) handleMouseDown(e);
    if (button === 2) addNote(clientX, clientY);
  }

  const { getNewNote } = useGetNewNote();
  function addNote(x: number, y: number) {
    onNotesChange?.([...notes, getNewNote(x, y)]);
    setIsEditing(true);
  }

  function moveTo(index: number) {
    const targetX = notes[index].x;
    const targetY = notes[index].y;
    onNotesChange?.(
      notes.map((note) => ({
        ...note,
        x: note.x - targetX + boardSize.w / 2 - 250 / 2,
        y: note.y - targetY + boardSize.h / 2 - 250 / 2,
      }))
    );
  }

  return (
    <div
      ref={boardRef}
      className={cx(
        "relative",
        "overflow-hidden",
        "bg-black-light",
        "select-none",
        className
      )}
      onContextMenu={(e) => e.preventDefault()}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className={cx("absolute", "size-full")}
        onMouseDown={handleBoardMouseDown}
        onDoubleClick={(e) => handleBoardDoubleClick(e.clientX, e.clientY)}
      />

      <div>
        {inScreenNotes.map(
          ({ text, color, x, y, rotate, key, isDraggable }, index) => {
            if (index === inScreenNotes.length - 1) return;
            return (
              <Note
                key={key}
                {...{ text, color, x, y, rotate }}
                onMouseDown={
                  isDraggable
                    ? (e) => handleNoteMouseDown(e.button, index)
                    : () => moveTo(index)
                }
              />
            );
          }
        )}
      </div>

      <Backdrop isEditing={isEditing} onMouseDown={() => setIsEditing(false)} />

      <div>
        {inScreenNotes.map(
          ({ text, color, x, y, rotate, key, isDraggable }, index) => {
            if (index !== inScreenNotes.length - 1) return;
            return (
              <Note
                key={key}
                {...{ text, color, x, y, rotate }}
                isDragging={isNoteMouseDown}
                isEditing={isEditing}
                onMouseDown={
                  isDraggable
                    ? (e) => handleNoteMouseDown(e.button, index)
                    : () => moveTo(index)
                }
                onDoubleClick={
                  isDraggable ? () => setIsEditing(true) : () => {}
                }
                onTextChange={handleTextChange}
                onColorChange={handleColorChange}
                onDelete={() => {
                  setIsEditing(false);
                  onNotesChange?.([...notes.slice(0, -1)]);
                }}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
