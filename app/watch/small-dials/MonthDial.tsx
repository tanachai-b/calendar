"use client";

import cx from "classnames";

export function MonthDial() {
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
      >
        <g fill="#808080" filter="url(#shadow1)">
          <polygon
            points={cx(
              `${-15 / 2},${-47}`,
              `${0},${-55}`,
              `${15 / 2},${-47}`,
              `${30 / 2},${0}`,
              `${-30 / 2},${0}`,
              `${-15 / 2},${-47}`
            )}
          />

          <circle r={30 / 2} />
        </g>

        <polygon
          fill="#e0a000"
          points={cx(
            `${-15 / 2},${-47}`,
            `${0},${-55}`,
            `${15 / 2},${-47}`,
            `${20 / 2},${-30}`,
            `${-20 / 2},${-30}`,
            `${-15 / 2},${-47}`
          )}
        />
      </g>
    </g>
  );
}
