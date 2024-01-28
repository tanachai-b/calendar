"use client";

import cx from "classnames";

export function FineScale() {
  return (
    <g fill="#808080">
      <circle
        cx={250}
        cy={250}
        r={250 - 2 / 2}
        fill="none"
        stroke="#808080"
        strokeWidth={2}
      />

      {Array.from({ length: 60 * 4 }).map((v, i) => (
        <rect
          key={i}
          x={-2 / 2}
          y={-250}
          width={2}
          height={10}
          transform={cx(
            `rotate(${(i / 60 / 4) * 360}, 250, 250)`,
            "translate(250, 250)"
          )}
        />
      ))}

      {Array.from({ length: 60 }).map((v, i) => (
        <rect
          key={i}
          x={-3 / 2}
          y={-250}
          width={3}
          height={25}
          transform={cx(
            `rotate(${(i / 60) * 360}, 250, 250)`,
            "translate(250, 250)"
          )}
        />
      ))}

      {Array.from({ length: 12 }).map((v, i) => (
        <text
          key={i}
          x={250 + 180 * Math.sin(((i + 1) / 12) * 2 * Math.PI)}
          y={250 - 180 * Math.cos(((i + 1) / 12) * 2 * Math.PI)}
          textAnchor="middle"
          alignmentBaseline="central"
          className={cx("text-x70", "font-semibold")}
        >
          {(i + 1) % 12 === 0 ? i + 1 : ""}
        </text>
      ))}
    </g>
  );
}
