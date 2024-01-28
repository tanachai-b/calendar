"use client";

import cx from "classnames";

export function FineScale() {
  return (
    <g>
      <g opacity={1 / 4}>
        {Array.from({ length: 60 * 4 }).map((v, i) => (
          <line
            key={i}
            x1={0}
            y1={5}
            x2={0}
            y2={15}
            strokeWidth={2}
            transform={cx(
              `rotate(${(i / 60 / 4) * 360}, 0, 0)`,
              "translate(0, -250)"
            )}
            stroke="#ffffff"
          />
        ))}

        {Array.from({ length: 60 }).map((v, i) => (
          <line
            key={i}
            x1={0}
            y1={5}
            x2={0}
            y2={25}
            strokeWidth={3}
            transform={cx(
              `rotate(${(i / 60) * 360}, 0, 0)`,
              "translate(0, -250)"
            )}
            stroke="#ffffff"
          />
        ))}
      </g>

      {/* {Array.from({ length: 12 }).map((v, i) => (
        <text
          key={i}
          x={180 * Math.sin(((i + 1) / 12) * 2 * Math.PI)}
          y={-180 * Math.cos(((i + 1) / 12) * 2 * Math.PI)}
          textAnchor="middle"
          alignmentBaseline="central"
          className={cx("text-x70", "font-semibold")}
          fill="#ffffff40"
        >
          {(i + 1) % 12 === 0 ? i + 1 : ""}
        </text>
      ))} */}
    </g>
  );
}
