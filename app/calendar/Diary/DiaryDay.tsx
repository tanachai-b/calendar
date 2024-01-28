import { weekdayNames } from "../../constants";

export function DiaryDay({
  day,
  weekday,
  isToday,
  keypoints,
  notes,
}: {
  day: number;
  weekday: number;
  isToday: boolean;
  keypoints: string[];
  notes: { time: string; note: string }[];
}) {
  const isSunday = weekday === 0;

  return (
    <div className="p-2.5 grid grid-cols-[2.5rem_1fr] gap-x-2.5">
      <div className="flex flex-row justify-end">
        <div
          className={`rounded-x5 w-full px-1 text-right text-xl font-extralight tabular-nums ${
            isToday
              ? "bg-highlight_yellow text-bg font-light"
              : isSunday
              ? "text-text_red"
              : "text-text_grey"
          } `}
        >
          {day}
        </div>
      </div>

      <div
        className={`flex items-center ${
          weekday === 0 ? "text-text_red" : "text-text_grey"
        }`}
      >
        {weekdayNames[weekday]}
      </div>

      <div />

      <div className="flex flex-col gap-2.5">
        {keypoints.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {keypoints.map((keypoint, index) => (
              <div
                key={index}
                className="rounded-x5 px-1 border border-highlight_yellow text-highlight_yellow font-normal cursor-pointer hover:bg-highlight_yellow hover:text-bg"
              >
                {keypoint}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}

        {notes.length > 0 ? (
          <div className="grid grid-cols-[min-content_1fr] gap-x-2.5 gap-y-1">
            {notes.map((note) => (
              <>
                <div className="text-text_white text-right">{note.time}</div>

                <div className="text-text_white whitespace-pre-line">
                  {note.note}
                </div>
              </>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
