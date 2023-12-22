import React, { useEffect, useMemo, useRef, useState } from "react";

import { DiaryYear } from "./DiaryYear";

export function useDiaryController() {
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

export function Diary({
  controller,
  className,
  data,
  onRequestPrevious,
  onRequestNext,
}: {
  controller: ReturnType<typeof useDiaryController>;
  className: string;
  data: {
    year: number;
    month: number;
    day: number;
    keypoints?: string[];
    notes?: { time: string; note: string }[];
  }[];
  onRequestPrevious: () => void;
  onRequestNext: () => void;
}) {
  const { todayRef, disableScrollHandler, setDisableScrollHandler, goToToday } =
    controller;

  const scrollRef = useRef(null);

  const dataCombinedYear = useMemo(
    () => combineYear(combineMonth(data)),
    [data]
  );

  const [topChild, setTopChild] = useState<number>(-1);
  const [bottomChild, setBottomChild] = useState<number>(-1);

  useEffect(() => {
    setTimeout(goToToday, 1000);
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

  return (
    <div
      ref={scrollRef}
      className={`flex flex-col overflow-y-auto scroll-pt-[460px] hide-scroll ${className}`}
    >
      {dataCombinedYear.map(({ year, months }) => (
        <DiaryYear key={year} year={year} months={months} todayRef={todayRef} />
      ))}
    </div>
  );
}

function combineMonth(
  data: {
    year: number;
    month: number;
    day: number;
    keypoints?: string[];
    notes?: { time: string; note: string }[];
  }[]
) {
  return data.reduce<
    {
      year: number;
      month: number;
      days: {
        day: number;
        keypoints: string[];
        notes: { time: string; note: string }[];
      }[];
    }[]
  >((prev, { year, month, day, keypoints = [], notes = [] }) => {
    const lastMonth = prev[prev.length - 1];

    if (prev.length === 0) {
      return [{ year, month, days: [{ day, keypoints, notes }] }];
    } else if (lastMonth.year === year && lastMonth.month === month) {
      return [
        ...prev.slice(0, -1),
        {
          year: lastMonth.year,
          month: lastMonth.month,
          days: [...lastMonth.days, { day, keypoints, notes }],
        },
      ];
    } else {
      return [...prev, { year, month, days: [{ day, keypoints, notes }] }];
    }
  }, []);
}

function combineYear(
  data: {
    year: number;
    month: number;
    days: {
      day: number;
      keypoints: string[];
      notes: { time: string; note: string }[];
    }[];
  }[]
) {
  return data.reduce<
    {
      year: number;
      months: {
        month: number;
        days: {
          day: number;
          keypoints: string[];
          notes: { time: string; note: string }[];
        }[];
      }[];
    }[]
  >((prev, { year, month, days }) => {
    const lastYear = prev[prev.length - 1];

    if (prev.length === 0) {
      return [{ year, months: [{ month, days }] }];
    } else if (lastYear.year === year) {
      return [
        ...prev.slice(0, -1),
        { year: lastYear.year, months: [...lastYear.months, { month, days }] },
      ];
    } else {
      return [...prev, { year, months: [{ month, days }] }];
    }
  }, []);
}

function getScrollInfo(target: HTMLElement) {
  const superChildren = Array.from(target.children);

  function spread(target: Element) {
    return Array.from(target.children).reduce<Element[]>(
      (prev, curr, index) => {
        if (index === 0) {
          return [...prev, curr];
        } else {
          return [...prev, ...Array.from(curr.children)];
        }
      },
      []
    );
  }
  const children = superChildren.reduce<Element[]>((prev, curr) => {
    return [...prev, ...spread(curr)];
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
