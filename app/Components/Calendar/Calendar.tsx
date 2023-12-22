import React, { useEffect, useMemo, useRef, useState } from "react";

import { CalendarYear } from "./CalendarYear";

export function Calendar({
  className,
  data,
  onRequestPrevious,
  onRequestNext,
  onDayClick,
}: {
  className: string;
  data: { year: number; month: number }[];
  onRequestPrevious: () => void;
  onRequestNext: () => void;
  onDayClick: (year: number, month: number) => void;
}) {
  const scrollRef = useRef(null);
  const todayRef = useRef(null);

  let intialized = false;

  const dataCombinedYear = useMemo(() => combineYear(data), [data]);

  const [disableScrollHandler, setDisableScrollHandler] =
    useState<boolean>(false);

  useEffect(() => {
    if (intialized) return;
    intialized = true;

    if (!scrollRef.current) return;

    (scrollRef.current as HTMLElement).scrollTo({
      top: (scrollRef.current as HTMLElement).clientHeight,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    const scrollCurrent = scrollRef.current as HTMLElement;
    scrollCurrent.addEventListener("scroll", handleScroll);
    scrollCurrent.addEventListener("scrollend", handleScrollEnd);

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

    const { childCount, scrollTopChild, scrollBottomChild, overscroll } =
      getScrollInfo(scrollRef.current);

    if (scrollTopChild === 0) {
      (scrollRef.current as HTMLElement).scrollTo({
        top: (scrollRef.current as HTMLElement).clientHeight,
        behavior: "instant",
      });
    }

    if (scrollTopChild === childCount - 1) {
      (scrollRef.current as HTMLElement).scrollBy({
        top: -overscroll,
        behavior: "instant",
      });
    }

    if (scrollTopChild <= 2) onRequestPrevious();
    if (scrollBottomChild >= childCount - 1) onRequestNext();
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

  function handleDayClick(
    year: number,
    month: number,
    monthRef: React.MutableRefObject<null>
  ) {
    if (!monthRef.current) return;

    setDisableScrollHandler(true);
    (monthRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });

    onDayClick(year, month);
  }

  return (
    <div
      ref={scrollRef}
      className={`flex flex-col overflow-y-auto scroll-pt-[46px] hide-scroll ${className}`}
    >
      <div className="shrink-0 h-full" />

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

      <div className="shrink-0 h-full" />
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

  function spread(superChildren: Element[]) {
    return superChildren.reduce<Element[]>(
      (prev, curr) => [...prev, ...Array.from(curr.children)],
      []
    );
  }

  const children = [
    superChildren[0],
    ...spread(superChildren.slice(1, -1)),
    superChildren[superChildren.length - 1],
  ];

  const childHeights = children.map(({ clientHeight }) => clientHeight);
  const childPositions = childHeights
    .reduce((prev, curr, index) => [...prev, prev[index] + curr], [0])
    .slice(0, -1);

  const scrollTop = target.scrollTop + childHeights[1];
  const scrollBottom = target.scrollTop + target.clientHeight;

  const childCount = children.length;
  const scrollTopChild = childPositions.findLastIndex(
    (value) => scrollTop >= value
  );
  const scrollBottomChild = childPositions.findLastIndex(
    (value) => scrollBottom >= value
  );

  const overscroll = scrollBottom - childPositions[childPositions.length - 1];

  return {
    childCount,
    scrollTopChild,
    scrollBottomChild,
    overscroll,
  };
}
