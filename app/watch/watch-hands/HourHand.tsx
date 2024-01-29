"use client";

import cx from "classnames";

import { Bevel } from "../Bevel";

export function HourHand({ value }: { value: number }) {
  const rand = Math.floor(Math.random() * 36 ** 4).toString(36);

  const angle = (((value / 1000 / 60 / 60) % 12) / 12) * 360;

  return (
    <g filter="url(#shadow1)">
      <defs>
        <g id={`shape-${rand}`}>
          <polygon
            points={cx(
              `${-30 / 2},${-140}`,
              `${0},${-150}`,
              `${30 / 2},${-140}`,
              `${50 / 2},${0}`,
              `${-50 / 2},${0}`,
              `${-30 / 2},${-140}`,

              `${-15 / 2},${-120}`,
              `${-30 / 2},${-30}`,
              `${30 / 2},${-30}`,
              `${15 / 2},${-120}`,
              `${-15 / 2},${-120}`
            )}
            transform={`rotate(${angle})`}
          />
        </g>
      </defs>

      <use href={`#shape-${rand}`} fill="#e0a000" />

      <Bevel shape={<use href={`#shape-${rand}`} />} />
    </g>
  );
}
