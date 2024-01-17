"use client";

import cx from "classnames";

import { StickyNote } from "../StickyNote";
import { useForceDataInScreen } from "./useForceDataInScreen";
import { useHandleDrag } from "./useHandleDrag";

export type stickyBoardData = {
  text: string;
  color: number;
  x: number;
  y: number;
  rotate: number;
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

  const {
    handleChildMouseDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useHandleDrag(data, onDataChanged);

  return (
    <div
      ref={boardRef}
      className={cx("relative", "overflow-hidden", "bg-black-light", className)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className={cx("blur-x50", "opacity-25")}>
        {forcedInScreenData?.map(({ text, color, x, y, rotate }, index) => (
          <StickyNote key={index} {...{ text, color, x, y, rotate }} />
        ))}
      </div>
      {forcedInScreenData?.map(
        ({ text, color, x, y, rotate, isDraggable }, index) => (
          <StickyNote
            key={index}
            {...{ text, color, x, y, rotate }}
            onMouseDown={
              isDraggable ? () => handleChildMouseDown(index) : () => {}
            }
          />
        )
      )}
    </div>
  );
}
