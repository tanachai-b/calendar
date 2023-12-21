import React from "react";

import { monthNames } from "../../constants";
import { DiaryDay } from "./DiaryDay";
import { getWeekdayName, isToday } from "../utils";

export function DiaryMonth({
  year,
  month,
  days,
}: {
  year: number;
  month: number;
  days: { day: number }[];
}) {
  return (
    <div>
      <div className="sticky top-[46px] bg-bg text-center text-base font-light text-text_white p-2.5 pb-0">
        {monthNames[month - 1]}
      </div>

      {days.map(({ day }, index) => (
        <DiaryDay
          key={index}
          day={day}
          weekday={getWeekdayName(year, month, day)}
          isToday={isToday(year, month, day)}
          // keypoints={[
          //   "went to office",
          //   "had dinner with colleagues",
          //   "went on a trip",
          // ]}
          // notes={[
          //   { time: "9:00", note: "leave home \n leave a bit late" },
          //   { time: "10:00", note: "arrive at office" },
          //   { time: "15:00", note: "went on a trip \n have fun" },
          // ]}
        />
      ))}
    </div>
  );
}
