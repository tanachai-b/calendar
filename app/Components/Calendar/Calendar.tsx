import React, { useEffect, useMemo, useRef, useState } from "react";

import { CalendarYear } from "./CalendarYear";

export function useCalendarController() {
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
  onRequestPrevious,
  onRequestNext,
  onMonthClicked,
}: {
  controller: ReturnType<typeof useCalendarController>;
  className: string;
  data: { year: number; month: number }[];
  onRequestPrevious: () => void;
  onRequestNext: () => void;
  onMonthClicked: (year: number, month: number) => void;
}) {
  const { todayRef, disableScrollHandler, setDisableScrollHandler, goToToday } =
    controller;

  const scrollRef = useRef(null);

  const dataCombinedYear = useMemo(() => combineYear(data), [data]);

  const [topChild, setTopChild] = useState<number>(-1);
  const [bottomChild, setBottomChild] = useState<number>(-1);

  useEffect(() => {
    setTimeout(goToToday, 10);
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
  }, [handleScroll, handleScrollEnd]);

  function handleScroll() {
    if (disableScrollHandler) return;
    if (!scrollRef.current) return;

    const { childCount, scrollTopChild, scrollBottomChild } = getScrollInfo(
      scrollRef.current
    );

    if (scrollTopChild != topChild) {
      setTopChild(scrollTopChild);
      if (scrollTopChild <= 3) onRequestPrevious();
    }

    if (scrollBottomChild != bottomChild) {
      setBottomChild(scrollBottomChild);
      if (scrollBottomChild >= childCount - 3) onRequestNext();
    }
  }

  function handleScrollEnd() {
    if (!scrollRef.current) return;
    setDisableScrollHandler(false);
  }

  function handleDayClick(
    year: number,
    month: number,
    monthRef: React.MutableRefObject<null>
  ) {
    if (!monthRef.current) return;

    setDisableScrollHandler(true);
    (monthRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });

    onMonthClicked(year, month);
  }

  return (
    <div
      ref={scrollRef}
      className={`flex flex-col overflow-y-auto scroll-pt-[46px] hide-scroll ${className}`}
    >
      {dataCombinedYear.map(({ year, months }) => (
        <CalendarYear
          key={year}
          year={year}
          months={months}
          todayRef={todayRef}
          onDayClick={(month, monthRef) =>
            handleDayClick(year, month, monthRef)
          }
        />
      ))}
    </div>
  );
}

function combineYear(data: { year: number; month: number }[]) {
  return data.reduce<{ year: number; months: number[] }[]>((prev, curr) => {
    const lastYear = prev[prev.length - 1];

    if (prev.length === 0) {
      return [{ year: curr.year, months: [curr.month] }];
    } else if (lastYear.year === curr.year) {
      return [
        ...prev.slice(0, -1),
        { year: lastYear.year, months: [...lastYear.months, curr.month] },
      ];
    } else {
      return [...prev, { year: curr.year, months: [curr.month] }];
    }
  }, []);
}

function getScrollInfo(target: HTMLElement) {
  const superChildren = Array.from(target.children);

  const children = superChildren.reduce<Element[]>(
    (prev, curr) => [...prev, ...Array.from(curr.children)],
    []
  );
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
