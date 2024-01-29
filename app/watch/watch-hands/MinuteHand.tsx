"use client";

import cx from "classnames";

import { Bevel } from "../Bevel";

export function MinuteHand({ value }: { value: number }) {
  const rand = Math.floor(Math.random() * 36 ** 4).toString(36);

  const angle = (((value / 1000 / 60) % 60) / 60) * 360;

  return (
    <g filter="url(#shadow1)">
      <defs>
        <g id={`shape-${rand}`}>
          <polygon
            points={cx(
              `${-30 / 2},${-210}`,
              `${0},${-220}`,
              `${30 / 2},${-210}`,
              `${50 / 2},${0}`,
              `${-50 / 2},${0}`,
              `${-30 / 2},${-210}`,

              `${-15 / 2},${-190}`,
              `${-30 / 2},${-30}`,
              `${30 / 2},${-30}`,
              `${15 / 2},${-190}`,
              `${-15 / 2},${-190}`
            )}
            transform={`rotate(${angle})`}
          />

          <circle r={50 / 2} />
        </g>
      </defs>

      <use href={`#shape-${rand}`} fill="#e0a000" />

      <Bevel shape={<use href={`#shape-${rand}`} />} />
    </g>
  );
}
