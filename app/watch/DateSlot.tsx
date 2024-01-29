"use client";

import cx from "classnames";

export function DateSlot({ value }: { value: number }) {
  const rand = Math.floor(Math.random() * 36 ** 4).toString(36);

  const todayTime = value + 1000 * 60 * new Date().getTimezoneOffset();

  const yesterdayDate = new Date(todayTime - 1000 * 60 * 60 * 24).getDate();
  const todayDate = new Date(todayTime).getDate();
  const tomorrowDate = new Date(todayTime + 1000 * 60 * 60 * 24).getDate();

  const lapsedDay = (value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24);
  const middayOffset = lapsedDay - 0.5;

  const dateTapeOffset =
    middayOffset >= 0
      ? Math.max(middayOffset * 12 * 12 - (12 * 12 * 0.5 - 0.5), 0)
      : Math.min(middayOffset * 12 * 12 + (12 * 12 * 0.5 - 0.5), 0);

  return (
    <g transform="translate(0, -110)">
      <circle r={50} fill="url(#radial1)" />
      <circle r={48} fill="url(#radial2)" />
      <circle r={30} fill="url(#radial1)" />
      <circle r={28} fill="#000000" />

      <mask id={`mask-${rand}`}>
        <circle r={28} fill="#ffffff" />
      </mask>

      <g mask={`url(#mask-${rand})`}>
        <g
          fill="#ffffff40"
          className={cx("text-x30", "font-semibold")}
          transform={`translate(${-dateTapeOffset * 50}, 0)`}
        >
          <text textAnchor="middle" alignmentBaseline="central" x={-50}>
            {yesterdayDate}
          </text>

          <text textAnchor="middle" alignmentBaseline="central">
            {todayDate}
          </text>

          <text textAnchor="middle" alignmentBaseline="central" x={50}>
            {tomorrowDate}
          </text>
        </g>
      </g>
    </g>
  );
}
