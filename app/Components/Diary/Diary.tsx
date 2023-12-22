import React, { useMemo, useRef } from "react";

import { DiaryYear } from "./DiaryYear";
import { useDiaryScroll } from "./useDiaryScroll";
import { SearchBox } from "../Common/SearchBox";

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
  const todayRef = useRef(null);

  const dataCombinedYear = useMemo(
    () => combineYear(combineMonth(data)),
    [data]
  );

  const { scrollRef } = useDiaryScroll(onRequestPrevious, onRequestNext);

  return (
    <div className={`flex flex-col ${className}`}>
      <SearchBox
        onSubmit={(value) => console.log("SearchBox onSubmit", value)}
      />

      <div
        ref={scrollRef}
        className="flex flex-col overflow-y-auto scroll-pt-[46px] hide-scroll"
      >
        <div className="shrink-0 h-full" />

        {dataCombinedYear.map(({ year, months }) => (
          <DiaryYear
            key={year}
            year={year}
            months={months}
            todayRef={todayRef}
          />
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
