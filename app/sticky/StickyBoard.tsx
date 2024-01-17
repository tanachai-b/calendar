"use client";

import cx from "classnames";
import { MouseEvent, useState } from "react";

import { StickyNote } from "./StickyNote";

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
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  function handleChildMouseDown(childIndex: number) {
    const result = [
      ...data.filter((_value, index) => index !== childIndex),
      data[childIndex],
    ];
    onDataChanged?.(result);

    setIsMouseDown(true);
  }

  function handleMouseDown(e: MouseEvent) {
    setMouse({ x: e.clientX, y: e.clientY });
  }

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    if (!isMouseDown) return;

    const child = data[data.length - 1];
    const newX = child.x + (clientX - mouse.x);
    const newY = child.y + (clientY - mouse.y);
    const movedChild = { ...child, x: newX, y: newY };

    const newData = [...data.slice(0, -1), movedChild];

    onDataChanged?.(newData);

    setMouse({ x: clientX, y: clientY });
  }

  return (
    <div
      className={cx("relative", "overflow-auto", "bg-black-light", className)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      <div className={cx("blur-x50", "opacity-25")}>
        {data?.map(({ text, color, x, y, rotate }, index) => (
          <StickyNote key={index} {...{ text, color, x, y, rotate }} />
        ))}
      </div>
      {data?.map(({ text, color, x, y, rotate }, index) => (
        <StickyNote
          key={text}
          {...{ text, color, x, y, rotate }}
          onMouseDown={() => handleChildMouseDown(index)}
        />
      ))}
    </div>
  );
}
