import { monthNames } from "../../constants";
import { getWeekday, isToday } from "../../utils";
import { DiaryDay } from "./DiaryDay";

export function DiaryMonth({
  year,
  month,
  days,
}: {
  year: number;
  month: number;
  days: {
    day: number;
    keypoints: string[];
    notes: { time: string; note: string }[];
  }[];
}) {
  return (
    <div>
      <div className="sticky top-[46px] bg-bg text-center text-base font-light text-text_grey p-2.5 pb-0">
        {monthNames[month - 1]}
      </div>

      {days.map(({ day, keypoints, notes }) => (
        <DiaryDay
          key={`${year}-${month}-${day}`}
          day={day}
          weekday={getWeekday(year, month, day)}
          isToday={isToday(year, month, day)}
          keypoints={keypoints}
          notes={notes}
        />
      ))}
    </div>
  );
}
