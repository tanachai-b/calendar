"use client";

import cx from "classnames";

export function DateSlot() {
  return (
    <g transform="translate(0.5, -125.5)">
      <rect
        x={-60 / 2}
        y={-40 / 2}
        width={60}
        height={40}
        fill="none"
        stroke="#ffffff40"
        strokeWidth="3"
      />

      <text
        fill="#ffffff40"
        textAnchor="middle"
        alignmentBaseline="central"
        className={cx("text-x30", "font-semibold")}
      >
        {new Date().getDate()}
      </text>
    </g>
  );
}
