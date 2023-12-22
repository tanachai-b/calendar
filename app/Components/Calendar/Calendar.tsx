import React, { useMemo, useRef } from "react";

import { CalendarYear } from "./CalendarYear";
import { useCalendarScroll } from "./useCalendarScroll";

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
  onDayClick: (year: number, month: number, day: number) => void;
}) {
  const todayRef = useRef(null);

  const dataCombinedYear = useMemo(() => combineYear(data), [data]);

  const { scrollRef, setDisableScrollHandler } = useCalendarScroll(
    onRequestPrevious,
    onRequestNext
  );

  function handleDayClick(
    year: number,
    month: number,
    day: number,
    monthRef: React.MutableRefObject<null>
  ) {
    if (!monthRef.current) return;

    setDisableScrollHandler(true);
    (monthRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });

    onDayClick(year, month, day);
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
          onDayClick={(month, day, monthRef) =>
            handleDayClick(year, month, day, monthRef)
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
