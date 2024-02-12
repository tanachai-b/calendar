"use client";

import cx from "classnames";

import { NavBar } from "../components";
import { ColorPalette } from "./ColorPalette";

export default function ColorPickerPage() {
  const divisions = 5;

  const hexSteps = Array.from({ length: divisions + 1 }).map((v, i) =>
    Math.floor(Math.min((i / divisions) * 256, 255))
      .toString(16)
      .padStart(2, "0")
  );

  const colorRows = [
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
    <div className={cx("h-full", "flex", "flex-col", "bg-black")}>
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
        <div>
          {colorRows.flat().filter((color) => color !== "none").length} colors
        </div>
        <ColorPalette colorRows={colorRows} />
      </div>
    </div>
  );
}
