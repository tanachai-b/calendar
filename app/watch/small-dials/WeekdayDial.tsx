"use client";

import cx from "classnames";

export function WeekdayDial({ value }: { value: number }) {
  return (
    <g transform={`translate(${125}, ${0})`}>
      <circle cx={0} cy={0} r={80} stroke="none" fill="url(#radial1)" />
      <circle cx={0} cy={0} r={79} stroke="none" fill="url(#radial2)" />
      <circle cx={0} cy={0} r={50} stroke="none" fill="url(#radial1)" />
      <circle cx={0} cy={0} r={49} stroke="none" fill="#101010" />

      {Array.from({ length: 7 }).map((v, i) => (
        <line
          key={i}
          x1={0}
          y1={5}
          x2={0}
          y2={30 - 5}
          strokeWidth={i % 7 === 0 ? 10 : ""}
          transform={cx(`rotate(${(i / 7) * 360}, 0, 0)`, "translate(0, -80)")}
          stroke="#ffffff60"
        />
      ))}

      {["S", "M", "T", "W", "T", "F", "S"].map((v, i) => {
        const flip = i >= 2 && i <= 4;
        return (
          <text key={i} transform={`rotate(${(-(i + 0.5) / 7) * 360})`}>
            <textPath
              strokeWidth={0}
              fill="#ffffff60"
              className={cx("text-x20", "font-bold")}
              textAnchor={"middle"}
              startOffset="50%"
              alignmentBaseline={"central"}
              href={flip ? "#textpath-reverse" : "#textpath"}
            >
              {v}
            </textPath>
          </text>
        );
      })}

      <g
        fill="#e0a000"
        stroke="none"
        transform={`rotate(${
          -((new Date().getDay() + value / 360 / 60 / 24) / 7) * 360
        })`}
        filter="url(#shadow1)"
      >
        <polygon
          points={cx(
            `${-15 / 2},${-45}`,
            `${0},${-55}`,
            `${15 / 2},${-45}`,
            `${30 / 2},${0}`,
            `${-30 / 2},${0}`,
            `${-15 / 2},${-45}`
          )}
        />

        <circle r={30 / 2} />
      </g>
    </g>
  );
}
