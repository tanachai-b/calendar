import { DiaryMonth } from "./DiaryMonth";

export function DiaryYear({
  year,
  months,
}: {
  year: number;
  months: {
    month: number;
    days: {
      day: number;
      keypoints: string[];
      notes: { time: string; note: string }[];
    }[];
  }[];
}) {
  return (
    <div>
      <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight text-text_white p-2.5 pb-0">
        {year}
      </div>

      {months.map(({ month, days }) => (
        <DiaryMonth
          key={`${year}-${month}`}
          year={year}
          month={month}
          days={days}
        />
      ))}
    </div>
  );
}
