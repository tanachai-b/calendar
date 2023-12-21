import React, { useEffect, useRef, useState } from "react";

import { CalendarYear } from "./CalendarYear";

export function useCalendar() {
  const todayRef = useRef(null);
  const [disableScrollHandler, setDisableScrollHandler] =
    useState<boolean>(false);

  async function goToToday() {
    if (!todayRef.current) return;

    setDisableScrollHandler(true);
    (todayRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }

  return { todayRef, disableScrollHandler, setDisableScrollHandler, goToToday };
}

export function Calendar({
  controller,
  className,
  data,
  onRequestBefore,
  onRequestAfter,
}: {
  controller: ReturnType<typeof useCalendar>;
  className: string;
  data: { year: number; months: number[] }[];
  onRequestBefore: () => void;
  onRequestAfter: () => void;
}) {
  const { todayRef, disableScrollHandler, setDisableScrollHandler } =
    controller;

  const scrollRef = useRef(null);

  const [topChild, setTopChild] = useState<number>(-1);
  const [bottomChild, setBottomChild] = useState<number>(-1);

  useEffect(() => {
    setTimeout(() => {
      if (!todayRef.current) return;

      setDisableScrollHandler(true);
      (todayRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }, 10);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollCurrent = scrollRef.current as HTMLElement;
    scrollCurrent.addEventListener("scroll", handleScroll);
    scrollCurrent.addEventListener("scrollend", handleScrollEnd);

    handleScroll();

    return () => {
      if (!scrollRef.current) return;

      const scrollCurrent = scrollRef.current as HTMLElement;
      scrollCurrent.removeEventListener("scroll", handleScroll);
      scrollCurrent.removeEventListener("scrollend", handleScrollEnd);
    };
  }, [handleScroll]);

  function handleScroll() {
    if (disableScrollHandler) return;

    if (!scrollRef.current) return;

    const { childCount, scrollTopChild, scrollBottomChild } = getScrollInfo(
      scrollRef.current
    );

    if (scrollTopChild != topChild) {
      setTopChild(scrollTopChild);
      if (scrollTopChild <= 3) onRequestBefore();
    }

    if (scrollBottomChild != bottomChild) {
      setBottomChild(scrollBottomChild);
      if (scrollBottomChild >= childCount - 3) onRequestAfter();
    }
  }

  function handleScrollEnd() {
    if (!scrollRef.current) return;
    setDisableScrollHandler(false);
  }

  return (
    <div
      ref={scrollRef}
      className={`flex flex-col overflow-y-auto scroll-pt-[46px] hide-scroll ${className}`}
    >
      {data.map(({ year, months }) => (
        <CalendarYear
          key={year}
          year={year}
          months={months}
          todayRef={todayRef}
        />
      ))}
    </div>
  );
}

function getScrollInfo(target: HTMLElement) {
  const superChildren = Array.from(target.children);

  const children = superChildren.reduce<Element[]>((prev, curr) => {
    return [...prev, ...Array.from(curr.children)];
  }, []);
  const childHeights = children.map(({ clientHeight }) => clientHeight);
  const childPositions = childHeights
    .reduce((prev, curr, index) => [...prev, prev[index] + curr], [0])
    .slice(0, -1);

  const scrollTop = target.scrollTop + childHeights[0];
  const scrollBottom = target.scrollTop + target.clientHeight;

  const childCount = children.length;
  const scrollTopChild = childPositions.findLastIndex(
    (value) => scrollTop >= value
  );
  const scrollBottomChild = childPositions.findLastIndex(
    (value) => scrollBottom >= value
  );

  return { childCount, scrollTopChild, scrollBottomChild };
}
