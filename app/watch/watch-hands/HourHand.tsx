"use client";

import cx from "classnames";

export function HourHand({ value }: { value: number }) {
  return (
    <g>
      <defs>
        <g id="hour-hand">
          <polygon
            points={cx(
              `${-30 / 2},${-140}`,
              `${0},${-150}`,
              `${30 / 2},${-140}`,
              `${50 / 2},${0}`,
              `${-50 / 2},${0}`,
              `${-30 / 2},${-140}`,

              `${-20 / 2},${-110}`,
              `${-30 / 2},${-30}`,
              `${30 / 2},${-30}`,
              `${20 / 2},${-110}`,
              `${-20 / 2},${-110}`
            )}
            transform={`rotate(${value / 60 / 12}, 0, 0)`}
          />
        </g>
      </defs>

      <g fill="#808080" stroke="#808080" strokeWidth={2} filter="url(#shadow1)">
        <use href="#hour-hand" />
      </g>

      <g fill="#404040" transform={`translate(${2 / 2}, ${2 / 2})`}>
        <use href="#hour-hand" />
      </g>

      <g fill="#c0c0c0" transform={`translate(${-2 / 2}, ${-2 / 2})`}>
        <use href="#hour-hand" />
      </g>

      <g fill="#808080">
        <use href="#hour-hand" />
      </g>

      <polygon
        points={cx(
          `${-27 / 2},${-140}`,
          `${0},${-149}`,
          `${27 / 2},${-140}`,
          `${30 / 2},${-120}`,
          `${-30 / 2},${-120}`,
          `${-27 / 2},${-140}`
        )}
        transform={`rotate(${value / 60 / 12}, 0, 0)`}
        fill="#e0a000"
      />
    </g>
  );
}
