"use client";

import cx from "classnames";
import { MouseEvent, ReactNode, useEffect, useState } from "react";

import { NavBar } from "../components";

export default function StickyPage() {
  const [data, setData] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setData(
      Array.from({ length: 8 }).map((v, i) => ({
        x: i * 70 + 70,
        y: i * 70 + 70,
      }))
    );
  }, []);

  return (
    <div className={cx("h-full", "flex", "flex-col")}>
      <NavBar className={cx("border-b", "border-highlight-yellow")} />

      <StickyBoard className={cx("grow")}>
        {data.map(({ x, y }, index) => (
          <StickyNote key={index} {...{ x, y, color: index }} />
        ))}
      </StickyBoard>
    </div>
  );
}

function StickyBoard({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cx("relative", "overflow-auto", "bg-black-light", className)}
    >
      {/* <div className="blur-x20">{children}</div> */}
      {children}
    </div>
  );
}

function StickyNote({
  x: initX = 0,
  y: initY = 0,
  color = 0,
}: {
  x?: number;
  y?: number;
  color?: number;
}) {
  const [x, setX] = useState<number>(initX);
  const [y, setY] = useState<number>(initY);

  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  function handleMouseDown(e: MouseEvent) {
    setIsMouseDown(true);

    setMouseX(e.clientX);
    setMouseY(e.clientY);
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isMouseDown) return;

    setX((x) => x + e.clientX - mouseX);
    setY((y) => y + e.clientY - mouseY);

    setMouseX(e.clientX);
    setMouseY(e.clientY);
  }

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
        ][color],

        isMouseDown ? "z-50" : "z-auto"
      )}
      style={{ left: x, top: y }}
      onMouseDown={handleMouseDown}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseMove={handleMouseMove}
    >
      Note
    </div>
  );
}
