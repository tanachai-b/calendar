import { useMemo } from "react";

import { SearchBox } from "../../components";
import { useCalendarScroll } from "../Calendar";
import { DiaryYear } from "./DiaryYear";

export function useDiaryController({
  data,
  onRequestPrevious,
  onRemovePrevious,
  onRequestNext,
  onRemoveNext,
  onScrollEnd,
}: {
  data: {
    year: number;
    month: number;
    day: number;
    keypoints: string[];
    notes: { time: string; note: string }[];
  }[];
  onRequestPrevious: () => void;
  onRemovePrevious: () => void;
  onRequestNext: () => void;
  onRemoveNext: () => void;
  onScrollEnd: (year: number, month: number) => void;
}) {
  const { scrollRef, setBlockCheckContent, resetScroll } = useCalendarScroll(
    data,
    onRequestPrevious,
    onRemovePrevious,
    onRequestNext,
    onRemoveNext,
    handleOnScrollEnd
  );

  function handleOnScrollEnd(scrollTop: number) {
    console.log("handleOnScroll", scrollTop);
    onScrollEnd(2023, 12);
  }

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

export function Diary({
  className,
  controller,
}: {
  className: string;
  controller: ReturnType<typeof useDiaryController>;
}) {
  const { scrollRef, data } = controller;

  const dataCombinedYear = useMemo(
    () => combineYear(combineMonth(data)),
    [data]
  );

  return (
    <div className={`flex flex-col ${className}`}>
      <SearchBox
        onSubmit={(value) => console.log("SearchBox onSubmit", value)}
      />

      <div
        ref={scrollRef}
        className="grow flex flex-col overflow-y-auto scroll-pt-[80px] hide-scroll"
      >
        {dataCombinedYear.map(({ year, months }) => (
          <DiaryYear key={year} year={year} months={months} />
        ))}

        <div className="shrink-0 h-full" />
      </div>
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
