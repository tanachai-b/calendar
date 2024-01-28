"use client";

import cx from "classnames";

export function MonthDial() {
  return (
    <g transform={`translate(${-125}, ${0})`}>
      <circle cx={0} cy={0} r={80} stroke="none" fill="url(#radial1)" />
      <circle cx={0} cy={0} r={79} stroke="none" fill="url(#radial2)" />
      <circle cx={0} cy={0} r={50} stroke="none" fill="url(#radial1)" />
      <circle cx={0} cy={0} r={49} stroke="none" fill="#101010" />

      {Array.from({ length: 12 }).map((v, i) => (
        <line
          key={i}
          x1={0}
          y1={5}
          x2={0}
          y2={30 - 5}
          strokeWidth={i % 3 === 0 ? 7 : ""}
          transform={cx(`rotate(${(i / 12) * 360}, 0, 0)`, "translate(0, -80)")}
          stroke="#ffffff60"
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
              fill="#ffffff60"
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

      <g
        fill="#e0a000"
        stroke="none"
        transform={`rotate(${
          -(
            (new Date().getMonth() +
              (new Date().getDate() - 1) /
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  0
                ).getDate()) /
            12
          ) * 360
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
