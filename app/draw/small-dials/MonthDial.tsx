"use client";

import cx from "classnames";

export function MonthDial() {
  return (
    <g transform={`translate(${250 - 125}, ${250})`}>
      <circle cx={0} cy={0} r={80} fill="none" />
      {/* <circle cx={0} cy={0} r={80 - 30} fill="none" /> */}

      {Array.from({ length: 12 }).map((v, i) => (
        <line
          key={i}
          x1={0}
          y1={-80}
          x2={0}
          y2={-80 + 30}
          strokeWidth={i % 3 === 0 ? 7 : ""}
          transform={`rotate(${(i / 12) * 360}, 0, 0)`}
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
              fill={i === 0 ? "#808080" : "#808080"}
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
        fill="#ffc000"
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
