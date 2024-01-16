"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
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
    <div className="flex flex-col h-full">
      <NavBar className="border-b border-highlight_yellow" />

      <div className="grow bg-bg2 relative overflow-auto">
        {data.map(({ x, y }, index) => (
          <Sticky key={index} {...{ x, y, color: index }} />
        ))}
      </div>
    </div>
  );
}

function Sticky({
  x: initX = 0,
  y: initY = 0,
  color = 0,
}: {
  x?: number;
  y?: number;
  color?: number;
}) {
  const COLORS = [
    "#ffe080",
    "#ffb080",
    "#ff80c0",
    "#c080ff",
    "#80c0ff",
    "#80ffc0",
    "#c0ff80",
    "#ffffff",
  ];

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
      style={{
        position: "absolute",
        left: x,
        top: y,

        width: "250px",
        height: "250px",

        borderRadius: "5px",
        backgroundColor: COLORS[color],
        boxShadow: "0 10px 20px 0px #00000080",

        padding: "10px",
        color: "#000000",
        fontSize: "12px",
        fontWeight: 400,
        userSelect: "none",

        zIndex: isMouseDown ? 100 : "auto",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseMove={handleMouseMove}
    >
      Sticky Text
    </div>
  );
}
