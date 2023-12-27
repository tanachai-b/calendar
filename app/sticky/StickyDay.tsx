import { Fragment } from "react";

import { weekdayNames } from "../constants";

export function StickyDay({
  day,
  weekday,
  notes,
}: {
  day?: number;
  weekday?: number;
  notes?: { topic?: string; details?: string[] }[];
}) {
  return (
    <div className="flex flex-row p-2.5 pb-5 gap-2.5">
      <div className="sticky top-[56px] shrink-0 w-7 text-xl font-light tabular-nums h-fit text-right">
        {day}
      </div>

      <div className="grow flex flex-col gap-1">
        {day != null ? (
          <div className="h-7 flex items-center">
            {weekday != null ? weekdayNames[weekday] : ""}
          </div>
        ) : (
          <></>
        )}

        {notes && notes.length > 0 ? <NotesGrid notes={notes} /> : <></>}
      </div>
    </div>
  );
}

function NotesGrid({
  notes,
}: {
  notes: {
    topic?: string;
    details?: string[];
  }[];
}) {
  return (
    <div className="grid grid-cols-[min-content_1fr] gap-1 text-sm text-text_white">
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
              <div />

              {<DetailsGrid details={details} />}
            </>
          ) : (
            <></>
          )}
        </Fragment>
      ))}
    </div>
  );
}

function DetailsGrid({ details }: { details: string[] }) {
  return (
    <div className="grid grid-cols-[min-content_1fr] p-1 gap-1 text-xs text-text_grey">
      {details?.map((detail, index) => (
        <Fragment key={index}>
          <div className="text-right tabular-nums">-</div>

          <div>{detail}</div>
        </Fragment>
      ))}
    </div>
  );
}
