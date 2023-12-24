import { useMemo } from "react";

import { CalendarYear } from "./CalendarYear";
import { useCalendarScroll } from "./useCalendarScroll";

export function useCalendarController({
  data,
  onRequestPrevious,
  onRemovePrevious,
  onRequestNext,
  onRemoveNext,
}: {
  data: {
    year: number;
    month: number;
    days: { day: number; keypointCount: number }[];
  }[];
  onRequestPrevious: () => void;
  onRemovePrevious: () => void;
  onRequestNext: () => void;
  onRemoveNext: () => void;
}) {
  const { scrollRef, setBlockCheckContent, resetScroll } = useCalendarScroll(
    data,
    onRequestPrevious,
    onRemovePrevious,
    onRequestNext,
    onRemoveNext
  );

  async function setData(setData: () => void) {
    setBlockCheckContent(true);
    await new Promise((resolve) => setTimeout(resolve, 10));

    setData();
    await new Promise((resolve) => setTimeout(resolve, 10));

    setBlockCheckContent(false);
    await new Promise((resolve) => setTimeout(resolve, 10));

    resetScroll();
  }

  return { scrollRef, data, setData };
}

export function Calendar({
  className,
  controller,
  onDayClick,
}: {
  className: string;
  controller: ReturnType<typeof useCalendarController>;
  onDayClick: (year: number, month: number, day: number) => void;
}) {
  const { scrollRef, data } = controller;

  const dataCombinedYear = useMemo(() => combineYear(data), [data]);

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
          onDayClick={(month, day) => onDayClick(year, month, day)}
        />
      ))}

      <div className="shrink-0 h-full w-[300px]" />
    </div>
  );
}

function combineYear(
  data: {
    year: number;
    month: number;
    days: { day: number; keypointCount: number }[];
  }[]
) {
  return data.reduce<
    {
      year: number;
      months: {
        month: number;
        days: { day: number; keypointCount: number }[];
      }[];
    }[]
  >((prev, curr) => {
    const lastYear = prev[prev.length - 1];

    if (prev.length === 0) {
      return [
        {
          year: curr.year,
          months: [{ month: curr.month, days: curr.days }],
        },
      ];
    } else if (lastYear.year === curr.year) {
      return [
        ...prev.slice(0, -1),
        {
          year: lastYear.year,
          months: [...lastYear.months, { month: curr.month, days: curr.days }],
        },
      ];
    } else {
      return [
        ...prev,
        {
          year: curr.year,
          months: [{ month: curr.month, days: curr.days }],
        },
      ];
    }
  }, []);
}
