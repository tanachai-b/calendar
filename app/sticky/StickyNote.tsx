"use client";

import cx from "classnames";

export function StickyNote({
  text,
  color = 0,
  x = 0,
  y = 0,
  rotate = 0,
  dragging,
  editing,
  onMouseDown,
  onDoubleClick,
}: {
  text?: string;
  color?: number;
  x?: number;
  y?: number;
  rotate?: number;
  dragging?: boolean;
  editing?: boolean;
  onMouseDown?: () => void;
  onDoubleClick?: () => void;
} = {}) {
  return (
    <div
      className={cx(
        "absolute",
        "w-[250px]",
        "h-[250px]",

        "p-x15",
        "text-x30",
        "font-light",
        "text-black-light",
        "font-handwriting",
        "select-none",

        "flex",
        "flex-col",
        "items-center",
        "justify-center",

        "rounded-x5",
        editing ? "shadow-x50" : dragging ? "shadow-x20" : "shadow-x10",
        [
          "bg-yellow-light",
          "bg-orange-light",
          "bg-red-light",
          "bg-purple-light",
          "bg-blue-light",
          "bg-green-bluish-light",
          "bg-green-yellowish-light",
          "bg-white",
        ][color],

        "transition-shadow"
      )}
      style={{
        left: x,
        top: y,
        transform: `rotate(${rotate}deg)`,
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <div className={cx("text-center")} contentEditable={editing}>
        {text}
      </div>
    </div>
  );
}
