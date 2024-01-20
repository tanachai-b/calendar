"use client";

import cx from "classnames";
import { useState } from "react";

import { StickyNote } from "../StickyNote";
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

  function handleInput(text: string): void {
    return onDataChanged?.([
      ...data.slice(0, -1),
      { ...data[data.length - 1], text },
    ]);
  }

  return (
    <div
      ref={boardRef}
      className={cx("relative", "overflow-hidden", "bg-black-light", className)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* <div className={cx("blur-x50", "opacity-25")}>
        {forcedInScreenData?.map(({ text, color, x, y, rotate, key }) => (
          <StickyNote key={key} {...{ text, color, x, y, rotate }} />
        ))}
      </div> */}

      <div>
        {forcedInScreenData?.map(
          ({ text, color, x, y, rotate, key, isDraggable }, index) => {
            if (isEditing && index === forcedInScreenData.length - 1) return;
            return (
              <StickyNote
                key={key}
                {...{ text, color, x, y, rotate }}
                dragging={
                  isChildMouseDown && index === forcedInScreenData.length - 1
                }
                onMouseDown={
                  isDraggable ? () => handleChildMouseDown(index) : () => {}
                }
                onDoubleClick={
                  isDraggable ? () => setIsEditing(true) : () => {}
                }
              />
            );
          }
        )}
      </div>

      <div className={cx("w-full", "h-full")}>
        <div
          className={cx(
            "absolute",
            "w-full",
            "h-full",
            { "backdrop-blur-x10": isEditing },
            { "pointer-events-none": !isEditing },
            "transition-all"
          )}
        />

        <div
          className={cx(
            "absolute",
            "w-full",
            "h-full",
            "bg-black-light",
            isEditing ? "opacity-50" : "opacity-0",
            { "pointer-events-none": !isEditing },
            "transition-all"
          )}
          onClick={() => setIsEditing(false)}
        />
        {isEditing ? (
          forcedInScreenData
            .slice(-1)
            ?.map(({ text, color, x, y, rotate, key }) => (
              <StickyNote
                key={key}
                {...{ text, color, x, y, rotate }}
                editing
                onInput={handleInput}
              />
            ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
