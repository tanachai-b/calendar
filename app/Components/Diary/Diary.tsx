import React, { useEffect, useMemo, useRef, useState } from "react";

import { DiaryYear } from "./DiaryYear";

export function Diary({
  className,
  data,
  onRequestPrevious,
  onRequestNext,
}: {
  className: string;
  data: {
    year: number;
    month: number;
    day: number;
    keypoints: string[];
    notes: { time: string; note: string }[];
  }[];
  onRequestPrevious: () => void;
  onRequestNext: () => void;
}) {
  const scrollRef = useRef(null);
  const todayRef = useRef(null);

  let intialized = false;

  const dataCombinedYear = useMemo(
    () => combineYear(combineMonth(data)),
    [data]
  );

  const [disableScrollHandler, setDisableScrollHandler] =
    useState<boolean>(false);

  useEffect(() => {
    if (!scrollRef.current) return;
    const scrollCurrent = scrollRef.current as HTMLElement;
    scrollCurrent.addEventListener("scroll", handleScroll);
    scrollCurrent.addEventListener("scrollend", handleScrollEnd);

    if (!intialized) {
      intialized = true;
      (scrollRef.current as HTMLElement).scrollTo({
        top: (scrollRef.current as HTMLElement).clientHeight,
        behavior: "instant",
      });
    }

    return () => {
      if (!scrollRef.current) return;
      const scrollCurrent = scrollRef.current as HTMLElement;
      scrollCurrent.removeEventListener("scroll", handleScroll);
      scrollCurrent.removeEventListener("scrollend", handleScrollEnd);
    };
  }, []);

  function handleScroll() {
    if (disableScrollHandler) return;
    if (!scrollRef.current) return;

    const { childCount, scrollTopChild, scrollBottomChild, overscroll } =
      getScrollInfo(scrollRef.current);

    if (scrollTopChild === 0) {
      (scrollRef.current as HTMLElement).scrollTo({
        top: (scrollRef.current as HTMLElement).clientHeight,
        behavior: "instant",
      });
    } else if (scrollTopChild === childCount - 1) {
      (scrollRef.current as HTMLElement).scrollBy({
        top: -overscroll,
        behavior: "instant",
      });
    }

    if (scrollTopChild <= 5) onRequestPrevious();
    if (scrollBottomChild >= childCount - 3) onRequestNext();
  }

  function handleScrollEnd() {
    if (disableScrollHandler) {
      setDisableScrollHandler(false);

      if (!scrollRef.current) return;

      (scrollRef.current as HTMLElement).scrollBy({
        top: 1,
        behavior: "instant",
      });
    }
  }

  return (
    <div
      ref={scrollRef}
      className={`flex flex-col overflow-y-auto scroll-pt-[46px] hide-scroll ${className}`}
    >
      <div className="shrink-0 h-full" />

      {dataCombinedYear.map(({ year, months }) => (
        <DiaryYear key={year} year={year} months={months} todayRef={todayRef} />
      ))}

      <div className="shrink-0 h-full" />
    </div>
  );
}

function combineMonth(
  data: {
    year: number;
    month: number;
    day: number;
    keypoints: string[];
    notes: { time: string; note: string }[];
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
  >((prev, { year, month, day, keypoints, notes }) => {
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

  function spreadMonths(superChildren: Element[]) {
    return superChildren.reduce<Element[]>(
      (prev, curr) => [...prev, ...Array.from(curr.children)],
      []
    );
  }

  function spreadYears(superChildren: Element[]) {
    return superChildren.reduce<Element[]>((prev, curr) => {
      const yearChildren = Array.from(curr.children);
      const spreadedMonths = [
        yearChildren[0],
        ...spreadMonths(yearChildren.slice(1)),
      ];
      return [...prev, ...spreadedMonths];
    }, []);
  }

  const spreadedYears = spreadYears(superChildren.slice(1, -1));

  const children = [
    superChildren[0],
    ...spreadedYears,
    superChildren[superChildren.length - 1],
  ];
  const childHeights = children.map(({ clientHeight }) => clientHeight);
  const childPositions = childHeights
    .reduce((prev, curr, index) => [...prev, prev[index] + curr], [0])
    .slice(0, -1);

  const scrollTop = target.scrollTop + childHeights[1] + childHeights[2];
  const scrollBottom = target.scrollTop + target.clientHeight;

  const childCount = children.length;
  const scrollTopChild = childPositions.findLastIndex(
    (value) => scrollTop >= value
  );
  const scrollBottomChild = childPositions.findLastIndex(
    (value) => scrollBottom >= value
  );

  const overscroll = scrollBottom - childPositions[childPositions.length - 1];

  return { childCount, scrollTopChild, scrollBottomChild, overscroll };
}
