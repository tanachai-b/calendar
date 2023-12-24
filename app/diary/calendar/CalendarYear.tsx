import { CalendarMonth } from "./CalendarMonth";

export function CalendarYear({
  year,
  months,
  onDayClick,
}: {
  year: number;
  months: { month: number; days: { day: number; keypointCount: number }[] }[];
  onDayClick: (month: number, day: number) => void;
}) {
  return (
    <div>
      <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight text-text_white p-2.5 pb-0">
        {year}
      </div>

      {months.map(({ month, days }) => (
        <CalendarMonth
          key={`${year}-${month}`}
          year={year}
          month={month}
          days={days}
          onDayClick={(day) => onDayClick(month, day)}
        />
      ))}
    </div>
  );
}
