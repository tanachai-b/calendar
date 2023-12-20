import React, { MutableRefObject, useEffect, useRef } from "react";

import { CalendarYear } from "./CalendarYear";

export function CalendarBar({
  todayRef,
}: {
  todayRef: MutableRefObject<null>;
}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    (scrollRef.current as HTMLElement).addEventListener("scroll", handleScroll);
  }, []);

  function handleScroll(e: Event): void {
    const { isAtFirstChild, isAtLastChild } = getScrollInfo(e);
    console.log("scroll", isAtFirstChild, isAtLastChild);
  }

  return (
    <div
      ref={scrollRef}
      className="flex flex-col overflow-y-auto snap-y scroll-p-[44px] hide-scroll border-r border-border"
    >
      <CalendarYear year={2023} todayRef={todayRef} />

      <CalendarYear year={2024} todayRef={todayRef} />
    </div>
  );
}

function getScrollInfo(e: Event) {
  const children = Array.from((e.target as HTMLElement).children);
  const childHeights = children.map((child) => child.clientHeight);
  const childPositions = childHeights.reduce(
    (prev, curr, index) => [...prev, prev[index] + curr],
    [0]
  );

  const scrollTop = (e.target as HTMLElement).scrollTop;
  const viewportHeight = (e.target as HTMLElement).clientHeight;

  const scrollTopChild = childPositions.findLastIndex(
    (value) => scrollTop >= value
  );
  const scrollBottomChild = childPositions.findLastIndex(
    (value) => scrollTop + viewportHeight >= value
  );

  const childCount = (e.target as HTMLElement).childElementCount;

  const isAtFirstChild = scrollTopChild === 0;
  const isAtLastChild = scrollBottomChild >= childCount - 1;
  return { isAtFirstChild, isAtLastChild };
}
