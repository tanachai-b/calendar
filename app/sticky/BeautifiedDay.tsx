import { Fragment } from "react";

import { monthNames } from "../constants";

export function NewDiaryDay({
  day,
  notes,
}: {
  day?: string;
  notes?: { topic?: string; details?: string[] }[];
}) {
  return (
    <div className={"flex flex-col p-2.5 pb-5"}>
      <div className={"text-xl font-light tabular-nums"}>{day}</div>

      {notes && notes.length > 0 ? (
        <div className="grid grid-cols-[min-content_1fr] gap-1 text-sm text-text_white pl-10">
          {notes?.map(({ topic, details }, index) => (
            <Fragment key={index}>
              {topic ? (
                <>
                  <div className="text-right tabular-nums">-</div>
                  <div>{topic}</div>
                </>
              ) : (
                <></>
              )}

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
