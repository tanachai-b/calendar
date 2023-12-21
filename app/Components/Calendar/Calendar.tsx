import React, { useEffect, useRef, useState } from "react";

import { CalendarYear } from "./CalendarYear";

export function useCalendar() {
  const todayRef = useRef(null);

  const initYearList = [
    new Date().getFullYear() - 1,
    new Date().getFullYear(),
    new Date().getFullYear() + 1,
    new Date().getFullYear() + 2,
  ];

  const [yearList, setYearList] = useState<number[]>(initYearList);

  async function goToToday() {
    setYearList(initYearList);

    await new Promise((resolve) => setTimeout(resolve, 10));

    if (!todayRef.current) return;
    (todayRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }

  return { todayRef, yearList, setYearList, goToToday };
}

export function Calendar({
  controller,
}: {
  controller: ReturnType<typeof useCalendar>;
}) {
  const { todayRef, yearList, setYearList } = controller;

  const scrollRef = useRef(null);

  let loading = false;
  const [scrollTopYear, setScrollTopYear] = useState<number>(-1);
  const [scrollBottomYear, setScrollBottomYear] = useState<number>(-1);

  useEffect(() => {
    if (!todayRef.current) return;
    (todayRef.current as HTMLElement).scrollIntoView({ behavior: "instant" });
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    (scrollRef.current as HTMLElement).addEventListener("scroll", handleScroll);

    return () => {
      if (!scrollRef.current) return;
      (scrollRef.current as HTMLElement).removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [handleScroll]);

  async function handleScroll(e: Event) {
    const { scrollTopChild, scrollBottomChild, isAtFirstChild, isAtLastChild } =
      getScrollInfo(e);

    const newScrollTopYear = yearList[scrollTopChild];
    const newScrollBottomYear = yearList[scrollBottomChild];

    if (
      !loading &&
      (newScrollTopYear !== scrollTopYear ||
        newScrollBottomYear !== scrollBottomYear)
    ) {
      loading = true;

      setScrollTopYear(newScrollTopYear);
      setScrollBottomYear(newScrollBottomYear);

      if (isAtFirstChild) {
        setYearList([yearList[0] - 1, ...yearList].slice(0, 4));
      } else if (isAtLastChild) {
        setYearList([...yearList, yearList[yearList.length - 1] + 1].slice(-4));
      }

      await new Promise((resolve) => setTimeout(resolve, 10));

      loading = false;
    }
  }

  return (
    <div
      ref={scrollRef}
      className="flex flex-col overflow-y-auto snxap-y scroll-p-[44px] hide-scroll border-r border-border"
    >
      {yearList.map((y) => (
        <CalendarYear key={y} year={y} todayRef={todayRef} />
      ))}
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
  return { scrollTopChild, scrollBottomChild, isAtFirstChild, isAtLastChild };
}
