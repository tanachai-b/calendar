import { Fragment } from "react";

import { monthNames } from "../constants";

export function BeautifiedDay({
  year,
  month,
  day,
  keypoints,
  notes,
}: {
  year?: string;
  month?: string;
  day?: string;
  keypoints?: string[];
  notes?: { time?: string; note?: string }[];
}) {
  return (
    <div className="flex flex-col p-2.5 gap-2.5">
      <div>
        <span>{year} </span>
        <span>{month ? monthNames[parseInt(month) - 1] : undefined} </span>
        <span>{day}</span>
      </div>

      {keypoints && keypoints.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {keypoints?.map((v, index) => (
            <div className="px-1 border border-border" key={index}>
              {v}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      {notes && notes.length > 0 ? (
        <div className="grid grid-cols-[min-content_1fr] gap-2.5">
          {notes?.map((v, index) => {
            return (
              <Fragment key={`${index}`}>
                <div className="text-right">{v.time}</div>
                <div className="whitespace-pre-wrap">{v.note}</div>
              </Fragment>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
