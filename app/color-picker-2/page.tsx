"use client";

import cx from "classnames";

import { NavBar } from "../components";

export default function ColorPickerPage() {
  const divisions = 4;

  const hexSteps = Array.from({ length: divisions + 1 }).map((v, i) =>
    Math.round(Math.min((i / divisions) * 256, 255))
      .toString(16)
      .padStart(2, "0")
  );

  const colorSets = [
    ...Array.from({ length: divisions })
      .map((v, i): string[][] => {
        const saturation = divisions - i;

        return Array.from({ length: divisions - saturation + 1 }).map(
          (v, i): string[] => {
            const brightness = divisions - saturation + 1 - 1 - i;

            const hexSteps2 = hexSteps.slice(
              0 + brightness,
              saturation + 1 + brightness
            );

            const min = hexSteps2[0];
            const max = hexSteps2.slice(-1)[0];
            const up = (i: number) => hexSteps2[i];
            const down = (i: number) => hexSteps2.slice(-1 - i)[0];

            return [
              ...Array.from({ length: hexSteps2.length - 1 }).map(
                (v, i): string => `#${max}${down(i)}${min}`
              ),
              ...Array.from({ length: divisions - saturation }).map(
                (v, i): string => "none"
              ),
              ...Array.from({ length: hexSteps2.length - 1 }).map(
                (v, i): string => `#${max}${min}${up(i)}`
              ),
              ...Array.from({ length: divisions - saturation }).map(
                (v, i): string => "none"
              ),
              ...Array.from({ length: hexSteps2.length - 1 }).map(
                (v, i): string => `#${down(i)}${min}${max}`
              ),
              ...Array.from({ length: divisions - saturation }).map(
                (v, i): string => "none"
              ),
              ...Array.from({ length: hexSteps2.length - 1 }).map(
                (v, i): string => `#${min}${up(i)}${max}`
              ),
              ...Array.from({ length: divisions - saturation }).map(
                (v, i): string => "none"
              ),
              ...Array.from({ length: hexSteps2.length - 1 }).map(
                (v, i): string => `#${min}${max}${down(i)}`
              ),
              ...Array.from({ length: divisions - saturation }).map(
                (v, i): string => "none"
              ),
              ...Array.from({ length: hexSteps2.length - 1 }).map(
                (v, i): string => `#${up(i)}${max}${min}`
              ),
              ...Array.from({ length: divisions - saturation }).map(
                (v, i): string => "none"
              ),
            ];
          }
        );
      })
      .flat(),
    ...Array.from({ length: divisions + 1 }).map((v, i): string[] => {
      const brightness = hexSteps[divisions - i];
      return [
        `#${brightness}${brightness}${brightness}`,
        ...Array.from({ length: divisions * 6 - 1 }).map(
          (v, i): string => "none"
        ),
      ];
    }),
  ];

  return (
    <div
      className={cx("h-full", "flex", "flex-col", "bg-black", "select-none")}
    >
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div
        className={cx(
          "grow",
          "bg-black-light",
          "flex",
          "flex-col",
          "overflow-scroll"
        )}
      >
        {ColorPalette(colorSets)}
      </div>
    </div>
  );
}

function ColorPalette(colorSets: string[][]) {
  return (
    <div
      className={cx(
        "flex",
        "flex-col",

        "p-x10",
        "gap-x5"
      )}
    >
      <div>{colorSets.flat().filter((v) => v !== "none").length} colors</div>

      {colorSets.map((v, i) => (
        <div key={i} className={cx("size-fit", "flex", "flex-row", "gap-x5")}>
          {v.map((v, i) => (
            <ColorCard key={i} v={v} />
          ))}
        </div>
      ))}
    </div>
  );
}

function ColorCard({ v }: { v: string }) {
  return v === "none" ? (
    <div className={cx("size-x50")} />
  ) : (
    <div className={cx("size-x50", "bg-black", "p-x1", "rounded-x0")}>
      <div
        className={cx(
          "size-full",
          "border-x2",
          "border-white",
          "rounded-x0",
          "p-x2",
          "text-x10",
          "font-semibold",
          "leading-none"
        )}
        style={{ background: v, color: textColor(v) }}
      >
        {v.toUpperCase().slice(1)}
      </div>
    </div>
  );
}

function textColor(color: string) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return r + g * 2 + b * 0.5 > 128 + 128 + 128 ? "#000000" : "#ffffff";
}
