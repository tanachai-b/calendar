"use client";

import cx from "classnames";

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

          <circle cx="0" cy="0" r={30 / 2} />
        </g>

        <mask id={`mask-${rand}`}>
          <use href={`#shape-${rand}`} fill="#ffffff" />
        </mask>

        <filter id={`erode-${rand}`}>
          <feMorphology operator="erode" radius="1.25" />
        </filter>

        <filter id={`blur-${rand}`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
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
