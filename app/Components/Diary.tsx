"use client";

import React from "react";

export function Diary({ className }: { className: string }) {
  return (
    <div className={`overflow-auto hide-scroll ${className}`}>
      <div>
        <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight text-text_white p-2.5 pb-0">
          2023
        </div>
        <div>
          <div className="sticky top-[46px] bg-bg text-center text-base font-light text-text_white px-2.5">
            November
          </div>
          <DiaryDay />
          <DiaryDay />
        </div>
        <div>
          <div className="sticky top-[46px] bg-bg text-center text-base font-light text-text_white px-2.5">
            December
          </div>
          <DiaryDay />
          <DiaryDay />
        </div>
      </div>
      <div>
        <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight text-text_white p-2.5 pb-0">
          2024
        </div>
        <div>
          <div className="sticky top-[46px] bg-bg text-center text-base font-light text-text_white px-2.5">
            January
          </div>
          <DiaryDay />
          <DiaryDay />
        </div>
        <div>
          <div className="sticky top-[46px] bg-bg text-center text-base font-light text-text_white px-2.5">
            February
          </div>
          <DiaryDay />
          <DiaryDay />
          <DiaryDay />
          <DiaryDay />
        </div>
      </div>
    </div>
  );
}
function DiaryDay() {
  return (
    <div className="p-2.5 grid grid-cols-[2.5rem_1fr] gap-x-2.5 gap-y-1">
      <div className="text-right text-xl font-extralight text-text_white">
        14
      </div>
      <div className="flex items-center">Thursday</div>

      <div />
      <div className="flex flex-row gap-1">
        <div className="rounded px-1 bg-highlight_yellow text-bg font-medium">
          went to office
        </div>
        <div className="rounded px-1 bg-highlight_yellow text-bg font-medium">
          had dinner with colleagues
        </div>
        <div className="rounded px-1 bg-highlight_yellow text-bg font-medium">
          went on a trip
        </div>
      </div>

      <div className="text-right">9:00</div>
      <div>
        leave home <br /> leave a bit late
      </div>

      <div className="text-right">10:00</div>
      <div>arrive at office</div>

      <div className="text-right">15:00</div>
      <div>
        went on a trip <br /> have fun
      </div>
    </div>
  );
}
