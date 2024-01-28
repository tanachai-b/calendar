"use client";

import cx from "classnames";

import { SmallDialHand } from "./SmallDialHand";

export function MoonDial() {
  const angle =
    -(
      (new Date() - new Date(2024, 0, 11, 18, 57)) /
      1000 /
      60 /
      60 /
      24 /
      29.53059
    ) * 360;
  return (
    <g transform={`translate(${0}, ${125})`}>
      <circle r={80} fill="url(#radial1)" />
      <circle r={78} fill="url(#radial2)" />
      <circle r={50} fill="url(#radial1)" />
      <circle r={48} fill="#101010" />

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

      <SmallDialHand angle={angle} />
    </g>
  );
}