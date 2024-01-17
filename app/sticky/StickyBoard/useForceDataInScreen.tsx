"use client";

import { RefObject, useEffect, useMemo, useRef, useState } from "react";

import { stickyBoardData } from "./StickyBoard";

export function useForceDataInScreen(data: stickyBoardData[]) {
  const boardRef = useRef<HTMLDivElement>(null);

  const [boardSize, setBoardSize] = useState({ w: 9999, h: 9999 });

  useEffect(
    () => observeBoardSize(boardRef, (boardSize) => setBoardSize(boardSize)),
    [boardRef.current]
  );

  const forcedInScreenData = useMemo(
    () => forceDataInScreen(data, boardSize),
    [boardSize, data]
  );

  return { boardRef, forcedInScreenData };
}

function observeBoardSize(
  boardRef: RefObject<HTMLDivElement>,
  onChange: (boardSize: { w: number; h: number }) => void
) {
  if (!boardRef.current) return;
  new ResizeObserver(() => {
    const board = boardRef.current;
    onChange({ w: board?.offsetWidth ?? 0, h: board?.offsetHeight ?? 0 });
  }).observe(boardRef.current);
}

function forceDataInScreen(
  data: stickyBoardData[],
  boardSize: { w: number; h: number }
) {
  const peek = 20;
  const minX = -250 + peek;
  const minY = -250 + peek;
  const maxX = boardSize.w - peek;
  const maxY = boardSize.h - peek;

  return data.map(({ x, y, ...rest }) => ({
    ...rest,
    x: Math.min(Math.max(x, minX), maxX),
    y: Math.min(Math.max(y, minY), maxY),
    isDraggable: x > minX && x < maxX && y > minY && y < maxY,
  }));
}
