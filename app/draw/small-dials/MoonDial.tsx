"use client";

import cx from "classnames";

export function MoonDial() {
  return (
    <g transform={`translate(${250}, ${250 + 125})`}>
      <circle cx={0} cy={0} r={80} fill="none" />
      {/* <circle cx={0} cy={0} r={80 - 30} fill="none" /> */}

      {Array.from({ length: 8 }).map((v, i) => (
        <line
          key={i}
          x1={0}
          y1={-80}
          x2={0}
          y2={-80 + 30}
          transform={`rotate(${((i + 0.5) / 8) * 360}, 0, 0)`}
        />
      ))}

      {[
        "\uD83C\uDF15",
        "\uD83C\uDF16",
        "\uD83C\uDF17",
        "\uD83C\uDF18",
        "\uD83C\uDF11",
        "\uD83C\uDF12",
        "\uD83C\uDF13",
        "\uD83C\uDF14",
      ].map((v, i) => (
        <text key={i} transform={`rotate(${(-i / 8) * 360})`}>
          <textPath
            strokeWidth={0}
            fill={i === 0 ? "#808080" : "#808080"}
            className={cx("text-x20", "font-bold")}
            textAnchor={"middle"}
            startOffset="50%"
            alignmentBaseline={"central"}
            href={"#textpath"}
          >
            {/* {i + 1} */}
            {v + "\uFE0E"}
          </textPath>
        </text>
      ))}

      <g
        fill="#ffc000"
        stroke="none"
        transform={`rotate(${
          -(
            (new Date() - new Date(2024, 0, 11, 18, 57)) /
            1000 /
            60 /
            60 /
            24 /
            29.53059
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