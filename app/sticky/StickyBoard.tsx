"use client";

import cx from "classnames";
import {
  MouseEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  const { boardRef, forcedInScreenData } = useForceDataInScreen(data);

  const {
    handleChildMouseDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useHandleDrag(data, onDataChanged);

  return (
    <div
      ref={boardRef}
      className={cx("relative", "overflow-hidden", "bg-black-light", className)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className={cx("blur-x50", "opacity-25")}>
        {forcedInScreenData?.map(({ text, color, x, y, rotate }, index) => (
          <StickyNote key={index} {...{ text, color, x, y, rotate }} />
        ))}
      </div>
      {forcedInScreenData?.map(
        ({ text, color, x, y, rotate, isDraggable }, index) => (
          <StickyNote
            key={index}
            {...{ text, color, x, y, rotate }}
            onMouseDown={
              isDraggable ? () => handleChildMouseDown(index) : () => {}
            }
          />
        )
      )}
    </div>
  );
}

function useForceDataInScreen(data: stickyBoardData[]) {
  const boardRef = useRef<HTMLDivElement>(null);

  const [boardSize, setBoardSize] = useState({ w: 9999, h: 9999 });

  useEffect(
    () => observeBoardSize(boardRef, (boardSize) => setBoardSize(boardSize)),
    [boardRef.current]
  );

  const forcedInScreenData = useMemo(
    () => forceInScreen(data, boardSize),
    [boardSize, data]
  );

  return { boardRef, forcedInScreenData };

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

  function forceInScreen(
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
}

function useHandleDrag(
  data: stickyBoardData[],
  onDataChanged?: (newData: stickyBoardData[]) => void
) {
  const [isChildMouseDown, setIsChildMouseDown] = useState<boolean>(false);
  const [isBoardMouseDown, setIsBoardMouseDown] = useState<boolean>(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const { moveChildToFront, moveTopChild, moveAllChild } = useMoveChildren();

  function handleChildMouseDown(childIndex: number) {
    setIsChildMouseDown(true);
    onDataChanged?.(moveChildToFront(data, childIndex));
  }

  function handleMouseDown(e: MouseEvent) {
    setIsBoardMouseDown(true);
    setMouse({ x: e.clientX, y: e.clientY });
  }

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    if (isChildMouseDown) {
      onDataChanged?.(moveTopChild(data, clientX - mouse.x, clientY - mouse.y));
    } else if (isBoardMouseDown) {
      onDataChanged?.(moveAllChild(data, clientX - mouse.x, clientY - mouse.y));
    }
    setMouse({ x: clientX, y: clientY });
  }

  function handleMouseUp() {
    setIsChildMouseDown(false);
    setIsBoardMouseDown(false);
  }

  return {
    handleChildMouseDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}

function useMoveChildren() {
  function moveChildToFront(data: stickyBoardData[], childIndex: number) {
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

  return { moveChildToFront, moveTopChild, moveAllChild };
}
