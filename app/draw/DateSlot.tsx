"use client";

import cx from "classnames";

export function DateSlot() {
  return (
    <g fill="#808080" transform={cx("translate(250.5, 160.5)")}>
      <rect
        x={-60 / 2}
        y={-40 / 2}
        width={60}
        height={40}
        fill="none"
        stroke="#808080"
        strokeWidth="3"
      />

      <text
        textAnchor="middle"
        alignmentBaseline="central"
        className={cx("text-x30", "font-semibold")}
      >
        {new Date().getDate()}
      </text>
    </g>
  );
}
