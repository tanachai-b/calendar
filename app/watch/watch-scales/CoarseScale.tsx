"use client";

import cx from "classnames";

export function CoarseScale() {
  const rand = Math.floor(Math.random() * 36 ** 4).toString(36);

  return (
    <g filter="url(#shadow2)">
      <defs>
        <g id={`shape-${rand}`}>
          {Array.from({ length: 12 }).map((v, i) => {
            if (i === 0) return;
            return (
              <rect
                key={i}
                x={-15 / 2}
                y={-230}
                width={15}
                height={i % 3 === 0 ? 20 : 50}
                transform={`rotate(${(i / 12) * 360}, 0, 0)`}
              />
            );
          })}

          <rect
            x={-15 / 2}
            y={-230}
            width={15}
            height={50}
            transform={`translate(-12,0)`}
          />

          <rect
            x={-15 / 2}
            y={-230}
            width={15}
            height={50}
            transform={`translate(12,0)`}
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
