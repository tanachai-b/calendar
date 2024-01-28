"use client";

import cx from "classnames";

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

        <filter id={`erode-${rand}`}>
          <feMorphology operator="erode" radius="1.25" />
        </filter>

        <filter id={`blur-${rand}`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
      </defs>

      <use href={`#shape-${rand}`} fill="#e0a000" />

      <mask id={`light-${rand}`}>
        <use
          href={`#shape-${rand}`}
          fill="#ffffff"
          filter={`url(#erode-${rand}) url(#blur-${rand})`}
          transform="translate(-2,-2)"
        />

        <use
          href={`#shape-${rand}`}
          fill="#000000"
          filter={`url(#erode-${rand})`}
        />
      </mask>

      <mask id={`shadow-${rand}`}>
        <use
          href={`#shape-${rand}`}
          fill="#ffffff"
          filter={`url(#erode-${rand}) url(#blur-${rand})`}
          transform="translate(2,2)"
        />

        <use
          href={`#shape-${rand}`}
          fill="#000000"
          filter={`url(#erode-${rand})`}
        />
      </mask>

      <use
        href={`#shape-${rand}`}
        fill="#ffffff80"
        mask={`url(#light-${rand})`}
      />

      <use
        href={`#shape-${rand}`}
        fill="#00000080"
        mask={`url(#shadow-${rand})`}
      />
    </g>
  );
}
