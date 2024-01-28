"use client";

import cx from "classnames";

export function SecondHand({ value }: { value: number }) {
  return (
    <g>
      <defs>
        <g id="second-hand">
          <polygon
            points={cx(
              `${-0 / 2},${-240}`,
              `${0},${-240}`,
              `${0 / 2},${-240}`,
              `${15 / 2},${70}`,
              `${-15 / 2},${70}`
            )}
            transform={cx(`rotate(${value}, 250, 250)`, "translate(250, 250)")}
          />

          <circle cx="250" cy="250" r={30 / 2} />
        </g>
      </defs>

      <g fill="#e0a000" stroke="#e0a000" strokeWidth={2} filter="url(#shadow1)">
        <use href="#second-hand" />
      </g>

      <g fill="#805000" transform={`translate(${2 / 2}, ${2 / 2})`}>
        <use href="#second-hand" />
      </g>

      <g fill="#fff080" transform={`translate(${-2 / 2}, ${-2 / 2})`}>
        <use href="#second-hand" />
      </g>

      <g fill="#e0a000">
        <use href="#second-hand" />
      </g>
    </g>
  );
}
