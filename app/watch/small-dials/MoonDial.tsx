"use client";

import cx from "classnames";

export function MoonDial() {
  return (
    <g transform={`translate(${0}, ${125})`}>
      <circle cx={0} cy={0} r={80} stroke="none" fill="url(#radial1)" />
      <circle cx={0} cy={0} r={79} stroke="none" fill="url(#radial2)" />
      <circle cx={0} cy={0} r={50} stroke="none" fill="url(#radial1)" />
      <circle cx={0} cy={0} r={49} stroke="none" fill="#101010" />

      {Array.from({ length: 8 }).map((v, i) => (
        <line
          key={i}
          x1={0}
          y1={5}
          x2={0}
          y2={30 - 5}
          transform={cx(
            `rotate(${((i + 0.5) / 8) * 360}, 0, 0)`,
            "translate(0, -80)"
          )}
          stroke="#ffffff60"
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
            fill="#ffffff60"
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
        fill="#e0a000"
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
