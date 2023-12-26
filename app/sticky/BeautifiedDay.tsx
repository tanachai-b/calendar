import { Fragment } from "react";

import { monthNames } from "../constants";

export function NewDiaryDay({
  className,
  day,
  notes,
}: {
  className?: string;
  day?: string;
  notes?: string[];
}) {
  return (
    <div className={`flex flex-col p-2.5 gap-2.5 ${className}`}>
      <div>
        <span>{day}</span>
      </div>

      {notes && notes.length > 0 ? (
        <div className="grid grid-cols-[min-content_1fr] gap-x-1 gap-y-2.5">
          {notes?.map((note, index) => (
            <Fragment key={`${index}`}>
              <div>-</div>
              <div className="whitespace-pre-wrap">{note}</div>
            </Fragment>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
