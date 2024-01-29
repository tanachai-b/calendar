"use client";

import { ReactElement } from "react";

export function Bevel({ shape }: { shape: ReactElement }) {
  const rand = Math.floor(Math.random() * 36 ** 4).toString(36);

  return (
    <>
      <defs>
        <filter id={`erode-${rand}`}>
          <feMorphology operator="erode" radius="1.25" />
        </filter>

        <filter id={`blur-${rand}`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>

        <mask id={`light-${rand}`}>
          <g
            fill="#ffffff"
            filter={`url(#erode-${rand}) url(#blur-${rand})`}
            transform="translate(-2, -2)"
          >
            {shape}
          </g>

          <g fill="#000000" filter={`url(#erode-${rand})`}>
            {shape}
          </g>
        </mask>

        <mask id={`shadow-${rand}`}>
          <g
            fill="#ffffff"
            filter={`url(#erode-${rand}) url(#blur-${rand})`}
            transform="translate(2, 2)"
          >
            {shape}
          </g>

          <g fill="#000000" filter={`url(#erode-${rand})`}>
            {shape}
          </g>
        </mask>
      </defs>

      <g fill="#ffffff80" mask={`url(#light-${rand})`}>
        {shape}
      </g>

      <g fill="#00000080" mask={`url(#shadow-${rand})`}>
        {shape}
      </g>
    </>
  );
}
