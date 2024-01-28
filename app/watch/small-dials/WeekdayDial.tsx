"use client";

import cx from "classnames";

import { SmallDialHand } from "./SmallDialHand";

export function WeekdayDial({ value }: { value: number }) {
  const angle = (-(((value / (1000 * 60 * 60 * 24)) % 7) - 3) / 7) * 360;

  return (
    <g transform={`translate(${125}, ${0})`}>
      <circle r={80} fill="url(#radial1)" />
      <circle r={78} fill="url(#radial2)" />
      <circle r={50} fill="url(#radial1)" />
      <circle r={48} fill="#101010" />

      {Array.from({ length: 7 }).map((v, i) => (
        <line
          key={i}
          x1={0}
          y1={5}
          x2={0}
          y2={30 - 5}
          strokeWidth={i % 7 === 0 ? 10 : ""}
          transform={cx(`rotate(${(i / 7) * 360})`, "translate(0, -80)")}
          stroke="#ffffff40"
        />
      ))}

      {["S", "M", "T", "W", "T", "F", "S"].map((v, i) => {
        const flip = i >= 2 && i <= 4;
        return (
          <text key={i} transform={`rotate(${(-(i + 0.5) / 7) * 360})`}>
            <textPath
              strokeWidth={0}
              fill="#ffffff40"
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

      <SmallDialHand angle={angle} />
    </g>
  );
}
