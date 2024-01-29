"use client";

import cx from "classnames";

import { Bevel } from "../Bevel";

export function SecondHand({ value }: { value: number }) {
  const rand = Math.floor(Math.random() * 36 ** 4).toString(36);

  const angle = (((value / 1000) % 60) / 60) * 360;

  return (
    <g filter="url(#shadow1)">
      <defs>
        <g id={`shape-${rand}`}>
          <polygon
            points={cx(
              `${-2 / 2},${-220}`,
              `${0},${-220}`,
              `${2 / 2},${-220}`,
              `${15 / 2},${70}`,
              `${-15 / 2},${70}`
            )}
            transform={`rotate(${angle})`}
          />

          <circle r={30 / 2} />
        </g>

        <mask id={`mask-${rand}`}>
          <use href={`#shape-${rand}`} fill="#ffffff" />
        </mask>
      </defs>

      <use href={`#shape-${rand}`} fill="#202020" />

      <g mask={`url(#mask-${rand})`}>
        <rect
          x={-25}
          y={-250}
          width={50}
          height={150}
          fill="#e0a000"
          transform={`rotate(${angle})`}
        />
      </g>

      <Bevel shape={<use href={`#shape-${rand}`} />} />
    </g>
  );
}
