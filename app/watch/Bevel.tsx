"use client";

import { ReactElement } from "react";

export function Bevel({ shape }: { shape: ReactElement }) {
  const rand = Math.floor(Math.random() * 36 ** 4).toString(36);

  return (
    <>
      <defs>
        <filter id={`dilate-${rand}`}>
          <feMorphology operator="dilate" radius="1" />
        </filter>

        <filter id={`erode-${rand}`}>
          <feMorphology operator="erode" radius="1" />
        </filter>

        <filter id={`blur-${rand}`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>

        <mask id={`shadow-${rand}`}>
          <g fill="#ffffff" filter={`url(#dilate-${rand})`}>
            {shape}
          </g>

          <g
            fill="#000000"
            transform="translate(-2, -2)"
            filter={`url(#blur-${rand})`}
          >
            {shape}
          </g>

          <g fill="#000000" filter={`url(#erode-${rand})`}>
            {shape}
          </g>
        </mask>

        <mask id={`light-${rand}`}>
          <g fill="#ffffff" filter={`url(#dilate-${rand})`}>
            {shape}
          </g>

          <g
            fill="#000000"
            transform="translate(2, 2)"
            filter={`url(#blur-${rand})`}
          >
            {shape}
          </g>

          <g fill="#000000" filter={`url(#erode-${rand})`}>
            {shape}
          </g>
        </mask>
      </defs>

      <g fill="#000000" opacity={0.75} mask={`url(#shadow-${rand})`}>
        {shape}
      </g>

      <g fill="#ffffff" opacity={0.75} mask={`url(#light-${rand})`}>
        {shape}
      </g>
    </>
  );
}
