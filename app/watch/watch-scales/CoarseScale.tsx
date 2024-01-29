"use client";

import { Bevel } from "../Bevel";

export function CoarseScale() {
  return (
    <g filter="url(#shadow2)">
      {Array.from({ length: 12 }).map((v, i) => {
        const rand = Math.floor(Math.random() * 36 ** 4).toString(36);

        return (
          <g key={i}>
            <defs>
              {i !== 0 ? (
                <rect
                  id={`shape-${rand}`}
                  x={-15 / 2}
                  y={-230}
                  width={15}
                  height={i % 3 === 0 ? 20 : 50}
                  transform={`rotate(${(i / 12) * 360}, 0, 0)`}
                />
              ) : (
                <g id={`shape-${rand}`}>
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
              )}
            </defs>

            <use href={`#shape-${rand}`} fill="#e0a000" />

            <Bevel shape={<use href={`#shape-${rand}`} />} />
          </g>
        );
      })}
    </g>
  );
}
