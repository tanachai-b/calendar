"use client";

import cx from "classnames";

import { SmallDialHand } from "./SmallDialHand";

export function MonthDial() {
  const angle =
    -(
      (new Date().getMonth() +
        (new Date().getDate() - 1) /
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ).getDate()) /
      12
    ) * 360;

  return (
    <g transform={`translate(${-125}, ${0})`}>
      <circle r={80} fill="url(#radial1)" />
      <circle r={78} fill="url(#radial2)" />
      <circle r={50} fill="url(#radial1)" />
      <circle r={48} fill="#101010" />

      {Array.from({ length: 12 }).map((v, i) => (
        <line
          key={i}
          x1={0}
          y1={5}
          x2={0}
          y2={30 - 5}
          strokeWidth={i % 3 === 0 ? 7 : ""}
          transform={cx(`rotate(${(i / 12) * 360}, 0, 0)`, "translate(0, -80)")}
          stroke="#ffffff40"
        />
      ))}

      {[
        "♑",
        "♒",
        "♓",
        "♈",
        "♉",
        "♊",
        "♋",
        "♌",
        "♍",
        "♎",
        "♏",
        "♐",
      ].map((v, i) => {
        const flip = i >= 3 && i <= 8;
        return (
          <text key={i} transform={`rotate(${(-(i + 0.5) / 12) * 360})`}>
            <textPath
              strokeWidth={0}
              fill="#ffffff40"
              className={cx("text-x20", "font-bold")}
              textAnchor={"middle"}
              startOffset="50%"
              alignmentBaseline={"central"}
              href={flip ? "#textpath-reverse" : "#textpath"}
            >
              {i + 1}
              {/* {v + "\uFE0E"} */}
            </textPath>
          </text>
        );
      })}

      <SmallDialHand angle={angle} />
    </g>
  );
}
