"use client";

import cx from "classnames";
import { MouseEvent, useEffect, useState } from "react";

import { NavBar } from "../components";

export default function StickyPage() {
  type StickyBoardData = Required<
    NonNullable<Parameters<typeof StickyBoard>[0]>
  >["data"];

  const [data, setData] = useState<StickyBoardData>([]);

  useEffect(() => {
    setData(
      Array.from({ length: 8 }).map((_value, index) => ({
        x: index * 70 + 70,
        y: index * 70 + 70,
        color: index,
      }))
    );
  }, []);

  return (
    <div className={cx("h-full", "flex", "flex-col")}>
      <NavBar className={cx("border-b", "border-highlight-yellow")} />

      <StickyBoard className={cx("grow")} data={data} onDataChanged={setData} />
    </div>
  );
}

function StickyBoard({
  className,
  data = [],
  onDataChanged,
}: {
  className?: string;
  data?: { x: number; y: number; color: number }[];
  onDataChanged?: (newData: { x: number; y: number; color: number }[]) => void;
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

function StickyNote({
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
