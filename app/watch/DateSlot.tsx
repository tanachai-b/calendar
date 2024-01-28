"use client";

import cx from "classnames";

export function DateSlot() {
  return (
    <g transform="translate(0, -110)">
      <circle r={50} fill="url(#radial1)" />
      <circle r={48} fill="url(#radial2)" />
      <circle r={30} fill="url(#radial1)" />
      <circle r={28} fill="#000000" />

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
