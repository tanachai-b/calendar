"use client";

import cx from "classnames";

export function MinuteHand({ value }: { value: number }) {
  return (
    <g>
      <defs>
        <g id="minute-hand">
          <polygon
            points={cx(
              `${-30 / 2},${-230}`,
              `${0},${-240}`,
              `${30 / 2},${-230}`,
              `${50 / 2},${0}`,
              `${-50 / 2},${0}`,
              `${-30 / 2},${-230}`,

              `${-20 / 2},${-200}`,
              `${-30 / 2},${-30}`,
              `${30 / 2},${-30}`,
              `${20 / 2},${-200}`,
              `${-20 / 2},${-200}`
            )}
            transform={`rotate(${value / 60}, 0, 0)`}
          />

          <circle cx="0" cy="0" r={50 / 2} />
        </g>
      </defs>

      <g fill="#808080" stroke="#808080" strokeWidth={2} filter="url(#shadow1)">
        <use href="#minute-hand" />
      </g>

      <g fill="#404040" transform={`translate(${2 / 2}, ${2 / 2})`}>
        <use href="#minute-hand" />
      </g>

      <g fill="#c0c0c0" transform={`translate(${-2 / 2}, ${-2 / 2})`}>
        <use href="#minute-hand" />
      </g>

      <g fill="#808080">
        <use href="#minute-hand" />
      </g>

      <polygon
        points={cx(
          `${-27 / 2},${-230}`,
          `${0},${-240}`,
          `${27 / 2},${-230}`,
          `${30 / 2},${-210}`,
          `${-30 / 2},${-210}`,
          `${-27 / 2},${-230}`
        )}
        transform={`rotate(${value / 60}, 0, 0)`}
        fill="#e0a000"
      />
    </g>
  );
}
