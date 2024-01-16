"use client";

import cx from "classnames";
import { MouseEvent, useState } from "react";

import { StickyNote } from "./StickyNote";

export type stickyBoardData = { x: number; y: number; color: number };

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

  function handleMouseMove(e: MouseEvent) {
    if (!isMouseDown) return;

    const newData = [
      ...data.map((value, index) => {
        if (index !== data.length - 1) return value;

        const newX = value.x + (e.clientX - mouse.x);
        const newY = value.y + (e.clientY - mouse.y);
        return { ...value, x: newX, y: newY };
      }),
    ];
    onDataChanged?.(newData);

    setMouse({ x: e.clientX, y: e.clientY });
  }

  return (
    <div
      className={cx("relative", "overflow-auto", "bg-black-light", className)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {data?.map(({ x, y, color }, index) => (
        <StickyNote
          key={index}
          {...{ x, y, color, onMouseDown: () => handleChildMouseDown(index) }}
        />
      ))}
    </div>
  );
}
