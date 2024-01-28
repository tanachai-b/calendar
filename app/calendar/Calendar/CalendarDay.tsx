export function CalendarDay({
  day,
  isSunday,
  isToday,
  keypointCount,
  onClick,
}: {
  day: number;
  isSunday: boolean;
  isToday: boolean;
  keypointCount: number;
  onClick: () => void;
}) {
  return (
    <div
      className={`w-10 h-10 hover:bg-bg_hover cursor-pointer flex flex-col items-center p-1 gap-1 ${
        isToday ? "text-bg" : isSunday ? "text-text_red" : "text-text_grey"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-4 h-4 rounded-x3 text-center leading-4 ${
          isToday ? "bg-highlight_yellow font-medium" : ""
        }`}
      >
        {day}
      </div>

      <div className="flex flex-wrap justify-center gap-0.5">
        {Array.from({ length: keypointCount }, (_value, index) => (
          <div
            key={index}
            className="w-1 h-1 rounded-full bg-highlight_yellow"
          />
        ))}
      </div>
    </div>
  );
}
