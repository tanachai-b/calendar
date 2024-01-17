"use client";

import { MouseEvent, useState } from "react";

import { stickyBoardData } from "./StickyBoard";

export function useHandleDrag(
  data: stickyBoardData[],
  onDataChanged?: (newData: stickyBoardData[]) => void
) {
  const [isChildMouseDown, setIsChildMouseDown] = useState<boolean>(false);
  const [isBoardMouseDown, setIsBoardMouseDown] = useState<boolean>(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  function handleChildMouseDown(childIndex: number) {
    setIsChildMouseDown(true);
    onDataChanged?.(moveChildToTop(data, childIndex));
  }

  function handleMouseDown(e: MouseEvent) {
    setIsBoardMouseDown(true);
    setMouse({ x: e.clientX, y: e.clientY });
  }

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    const offsetX = clientX - mouse.x;
    const offsetY = clientY - mouse.y;

    if (isChildMouseDown) {
      onDataChanged?.(moveTopChild(data, offsetX, offsetY));
    } else if (isBoardMouseDown) {
      onDataChanged?.(moveAllChild(data, offsetX, offsetY));
    }
    setMouse({ x: clientX, y: clientY });
  }

  function handleMouseUp() {
    setIsChildMouseDown(false);
    setIsBoardMouseDown(false);
  }

  return {
    isChildMouseDown,
    handleChildMouseDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}

function moveChildToTop(data: stickyBoardData[], childIndex: number) {
  return [
    ...data.filter((_value, index) => index !== childIndex),
    data[childIndex],
  ];
}

function moveTopChild(
  data: stickyBoardData[],
  offsetX: number,
  offsetY: number
) {
  const { x, y, ...rest } = data[data.length - 1];
  return [...data.slice(0, -1), { ...rest, x: x + offsetX, y: y + offsetY }];
}

function moveAllChild(
  data: stickyBoardData[],
  offsetX: number,
  offsetY: number
) {
  return data.map(({ x, y, ...rest }) => ({
    ...rest,
    x: x + offsetX,
    y: y + offsetY,
  }));
}
