"use client";

import cx from "classnames";

export function CoarseScale() {
  return (
    <g>
      <defs>
        <g id="hatch-marks">
          {Array.from({ length: 12 }).map((v, i) => (
            <rect
              key={i}
              x={-10 / 2}
              y={-230}
              width={10}
              height={i % 3 === 0 ? 20 : 50}
              transform={`rotate(${(i / 12) * 360}, 0, 0)`}
            />
          ))}
        </g>
      </defs>

      <g fill="#e0a000" stroke="#e0a000" strokeWidth={2} filter="url(#shadow2)">
        <use href="#hatch-marks" />
      </g>

      <g fill="#805000" transform={`translate(${2 / 2}, ${2 / 2})`}>
        <use href="#hatch-marks" />
      </g>

      <g fill="#fff080" transform={`translate(${-2 / 2}, ${-2 / 2})`}>
        <use href="#hatch-marks" />
      </g>

      <g fill="#e0a000">
        <use href="#hatch-marks" />
      </g>
    </g>
  );
}
