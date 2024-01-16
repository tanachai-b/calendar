"use client";

import cx from "classnames";

export function StickyNote({
  x = 0,
  y = 0,
  color = 0,
  onMouseDown,
}: {
  x?: number;
  y?: number;
  color?: number;
  onMouseDown?: () => void;
} = {}) {
  return (
    <div
      className={cx(
        "absolute",
        "w-x300",
        "h-x300",

        "p-x15",
        "text-x15",
        "font-normal",
        "text-black",
        "select-none",

        "rounded-x5",
        "shadow-x20",
        [
          "bg-yellow-light",
          "bg-orange-light",
          "bg-red-light",
          "bg-purple-light",
          "bg-blue-light",
          "bg-green-bluish-light",
          "bg-green-yellowish-light",
          "bg-white",
        ][color]
      )}
      style={{ left: x, top: y }}
      onMouseDown={onMouseDown}
    >
      Note
    </div>
  );
}
