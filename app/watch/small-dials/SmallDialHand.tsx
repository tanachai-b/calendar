"use client";

import cx from "classnames";

export function SmallDialHand({ angle }: { angle: number }) {
  const rand = Math.floor(Math.random() * 36 ** 4).toString(36);

  return (
    <g filter="url(#shadow1)">
      <defs>
        <polygon
          id={`hand-${rand}`}
          points={cx(
            `${-15 / 2},${-47}`,
            `${0},${-55}`,
            `${15 / 2},${-47}`,
            `${30 / 2},${0}`,
            `${-30 / 2},${0}`,
            `${-15 / 2},${-47}`
          )}
          transform={`rotate(${angle})`}
        />

        <circle id={`circle-${rand}`} r={30 / 2} />

        <g id={`shape-${rand}`}>
          <use href={`#hand-${rand}`} />
          <use href={`#circle-${rand}`} />
        </g>

        <clipPath id={`clip-${rand}`}>
          <use href={`#hand-${rand}`} />
          <use href={`#circle-${rand}`} />
        </clipPath>

        <filter id={`erode-${rand}`}>
          <feMorphology operator="erode" radius="1.25" />
        </filter>

        <filter id={`blur-${rand}`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
      </defs>

      <g>
        <use href={`#shape-${rand}`} fill="#808080" />

        <g fill="#e0a000" clipPath={`url(#clip-${rand})`}>
          <rect
            x={-50 / 2}
            y={-55}
            width={50}
            height={20}
            transform={`rotate(${angle})`}
          />
        </g>
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
