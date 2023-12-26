import { Fragment } from "react";

import { monthNames } from "../constants";

export function NewDiaryDay({
  className,
  day,
  notes,
}: {
  className?: string;
  day?: string;
  notes?: { topic?: string; details?: string[] }[];
}) {
  return (
    <div className={`flex flex-col p-2.5 gap-2.5 ${className}`}>
      <div className="text-2xl">{day}</div>

      {notes && notes.length > 0 ? (
        <div className="grid grid-cols-[min-content_1fr] gap-1 text-sm text-text_white">
          {notes?.map(({ topic, details }, index) => (
            <Fragment key={index}>
              <div className="text-right tabular-nums">-</div>
              <div>{topic}</div>

              {details && details.length > 0 ? (
                <>
                  <div></div>
                  <div className="grid grid-cols-[min-content_1fr] p-1 gap-1 text-xs text-text_grey">
                    {details?.map((detail, index) => (
                      <Fragment key={index}>
                        <div className="text-right tabular-nums">-</div>

                        <div>{detail}</div>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : (
                <></>
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
