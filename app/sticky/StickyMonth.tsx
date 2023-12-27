import { StickyDay } from "./StickyDay";
import { monthNames } from "../constants";
import { getWeekday } from "../utils";

export function StickyMonth({
  month,
  days,
}: {
  month?: number;
  days: {
    day?: number;
    notes?: {
      topic: string;
      details: string[];
    }[];
  }[];
}) {
  return (
    <div>
      {month != null ? (
        <div className="sticky top-0 z-50 bg-bg flex flex-row p-2.5 pl-12 mt-10 mb-5 text-3xl font-extralight">
          <div className="grow">{monthNames[month - 1]}</div>
          <div>2023</div>
        </div>
      ) : (
        <></>
      )}

      {days.map(({ day, notes }, index) => (
        <StickyDay
          key={index}
          day={day}
          weekday={
            month != null && day != null
              ? getWeekday(2023, month, day)
              : undefined
          }
          notes={notes}
        />
      ))}
    </div>
  );
}
