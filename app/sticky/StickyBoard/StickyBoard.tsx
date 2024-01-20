import cx from "classnames";
import { useState } from "react";

import { StickyNote } from "../StickyNote/StickyNote";
import { EditingBackDrop } from "./EditingBackDrop";
import { useForceDataInScreen } from "./useForceDataInScreen";
import { useHandleDrag } from "./useHandleDrag";

export type stickyBoardData = {
  text: string;
  color: number;
  x: number;
  y: number;
  rotate: number;
  key: string;
};

export function StickyBoard({
  className,
  data = [],
  onDataChanged,
}: {
  className?: string;
  data?: stickyBoardData[];
  onDataChanged?: (newData: stickyBoardData[]) => void;
} = {}) {
  const { boardRef, forcedInScreenData } = useForceDataInScreen(data);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    isChildMouseDown,
    handleChildMouseDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useHandleDrag(data, onDataChanged ?? (() => {}), isEditing);

  function handleTextChange(text: string): void {
    onDataChanged?.([...data.slice(0, -1), { ...data[data.length - 1], text }]);
  }

  function handleColorChange(color: number): void {
    onDataChanged?.([
      ...data.slice(0, -1),
      { ...data[data.length - 1], color },
    ]);
    setIsEditing(false);
  }

  const { getBlankStickyNote } = useGetBlankStickyNote();
  function handleDoubleClick(x: number, y: number) {
    onDataChanged?.([...data, getBlankStickyNote(x, y)]);
    setIsEditing(true);
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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className={cx("absolute", "size-full")}
        onDoubleClick={(e) => handleDoubleClick(e.clientX, e.clientY)}
      />

      <div>
        {forcedInScreenData.map(
          ({ text, color, x, y, rotate, key, isDraggable }, index) => {
            if (index === forcedInScreenData.length - 1) return;
            return (
              <StickyNote
                key={key}
                {...{ text, color, x, y, rotate }}
                onMouseDown={
                  isDraggable ? () => handleChildMouseDown(index) : () => {}
                }
              />
            );
          }
        )}
      </div>

      <EditingBackDrop
        isEditing={isEditing}
        onClick={() => setIsEditing(false)}
      />

      <div>
        {forcedInScreenData.map(
          ({ text, color, x, y, rotate, key, isDraggable }, index) => {
            if (index !== forcedInScreenData.length - 1) return;
            return (
              <StickyNote
                key={key}
                {...{ text, color, x, y, rotate }}
                isDragging={isChildMouseDown}
                isEditing={isEditing}
                onMouseDown={
                  isDraggable ? () => handleChildMouseDown(index) : () => {}
                }
                onDoubleClick={
                  isDraggable ? () => setIsEditing(true) : () => {}
                }
                onTextChange={handleTextChange}
                onColorChange={handleColorChange}
                onDelete={() => {
                  setIsEditing(false);
                  onDataChanged?.([...data.slice(0, -1)]);
                }}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

function useGetBlankStickyNote() {
  const [lastColors, setLastColors] = useState<number[]>([]);

  function getBlankStickyNote(x: number, y: number) {
    let newColor = Math.floor(8 * Math.random());
    while (lastColors.includes(newColor)) {
      newColor = Math.floor(8 * Math.random());
    }

    const lastSixColors = [...lastColors, newColor].slice(
      Math.max(lastColors.length - 6 + 1, 0)
    );
    setLastColors(lastSixColors);

    return {
      text: "",
      color: newColor,
      x: x - 125,
      y: y - 125,
      rotate: Math.floor((10 * Math.random() - 10 / 2) * 10) / 10,
      key: Math.floor(Math.random() * 1000000).toString(36),
    };
  }

  return { getBlankStickyNote };
}
