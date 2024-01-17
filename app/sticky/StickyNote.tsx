"use client";

import cx from "classnames";

export function StickyNote({
  text,
  x = 0,
  y = 0,
  rotate = 0,
  color = 0,
  onMouseDown,
}: {
  text?: string;
  color?: number;
  x?: number;
  y?: number;
  rotate?: number;
  onMouseDown?: () => void;
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
      style={{
        left: x,
        top: y,
        transform: `rotate(${rotate}deg)`,
      }}
      onMouseDown={onMouseDown}
    >
      {text}
    </div>
  );
}
