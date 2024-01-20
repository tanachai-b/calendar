import cx from "classnames";
import { useState } from "react";

import { StickyNote } from "../StickyNote/StickyNote";
import { useForceDataInScreen } from "./useForceDataInScreen";
import { useHandleDrag } from "./useHandleDrag";
import { EditingBackDrop } from "./EditingBackDrop";

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
    onDataChanged?.([...data.slice(0, -1), { ...data[data.length - 1], text }]);
  }

  return (
    <div
      ref={boardRef}
      className={cx(
        "relative",
        "overflow-hidden",
        "bg-black-light",
        className,
        "select-none"
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
                onInput={handleInput}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
