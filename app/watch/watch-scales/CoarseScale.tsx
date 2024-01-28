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
              y={-235}
              width={10}
              height={i % 3 === 0 ? 20 : 50}
              transform={cx(
                `rotate(${(i / 12) * 360}, 250, 250)`,
                "translate(250, 250)"
              )}
            />
          ))}
        </g>
      </defs>

      <g fill="#ffc000" stroke="#ffc000" strokeWidth={2} filter="url(#shadow2)">
        <use href="#hatch-marks" />
      </g>

      <g fill="#805000" transform={`translate(${2 / 2}, ${2 / 2})`}>
        <use href="#hatch-marks" />
      </g>

      <g fill="#fff080" transform={`translate(${-2 / 2}, ${-2 / 2})`}>
        <use href="#hatch-marks" />
      </g>

      <g fill="#ffc000">
        <use href="#hatch-marks" />
      </g>
    </g>
  );
}
