"use client";

import cx from "classnames";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";

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
  const ref = useRef(null);

  const [isChildMouseDown, setIsChildMouseDown] = useState<boolean>(false);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [boardSize, setBoardSize] = useState({ w: 9999, h: 9999 });

  useEffect(() => {
    if (ref.current) resizeObserver.observe(ref.current);
  }, [ref.current]);

  const resizeObserver = new ResizeObserver(() => {
    if (!ref.current) return;
    const current = ref.current as HTMLElement;
    setBoardSize({ w: current.offsetWidth, h: current.offsetHeight });
  });

  const datax = useMemo(() => {
    const minX = -250 + 20;
    const minY = -250 + 20;
    const maxX = boardSize.w - 20;
    const maxY = boardSize.h - 20;

    return data.map(({ x, y, ...rest }) => {
      return {
        ...rest,
        x: Math.min(Math.max(x, minX), maxX),
        y: Math.min(Math.max(y, minY), maxY),
        isDraggable: x > minX && x < maxX && y > minY && y < maxY,
      };
    });
  }, [data, boardSize]);

  function handleChildMouseDown(childIndex: number) {
    const result = [
      ...data.filter((_value, index) => index !== childIndex),
      data[childIndex],
    ];
    onDataChanged?.(result);

    setIsChildMouseDown(true);
  }

  function handleMouseDown(e: MouseEvent) {
    setIsMouseDown(true);
    setMouse({ x: e.clientX, y: e.clientY });
  }

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    if (isChildMouseDown) {
      moveTopChild(clientX - mouse.x, clientY - mouse.y);
    } else if (isMouseDown) {
      moveAllChild(clientX - mouse.x, clientY - mouse.y);
    }
    setMouse({ x: clientX, y: clientY });
  }

  function moveTopChild(offsetX: number, offsetY: number) {
    const { x, y, ...rest } = data[data.length - 1];
    const newData = [
      ...data.slice(0, -1),
      { ...rest, x: x + offsetX, y: y + offsetY },
    ];
    onDataChanged?.(newData);
  }

  function moveAllChild(offsetX: number, offsetY: number) {
    const newData = data.map(({ x, y, ...rest }) => ({
      ...rest,
      x: x + offsetX,
      y: y + offsetY,
    }));
    onDataChanged?.(newData);
  }

  function handleMouseUp() {
    setIsChildMouseDown(false);
    setIsMouseDown(false);
  }

  return (
    <div
      ref={ref}
      className={cx("relative", "overflow-hidden", "bg-black-light", className)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className={cx("blur-x50", "opacity-25")}>
        {datax?.map(({ text, color, x, y, rotate }, index) => (
          <StickyNote key={index} {...{ text, color, x, y, rotate }} />
        ))}
      </div>
      {datax?.map(({ text, color, x, y, rotate, isDraggable }, index) => (
        <StickyNote
          key={text}
          {...{ text, color, x, y, rotate }}
          onMouseDown={
            isDraggable ? () => handleChildMouseDown(index) : () => {}
          }
        />
      ))}
    </div>
  );
}
