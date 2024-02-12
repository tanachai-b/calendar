"use client";

import cx from "classnames";

import { NavBar } from "../components";
import { ColorPalette } from "./ColorPalette";
import { useGetPalettes } from "./useGetPalettes";

export default function ColorPickerPage() {
  const subdivisions = 4;
  const { huePalettes, monoPalette } = useGetPalettes(subdivisions);

  const colorCount =
    huePalettes.flat(2).flatMap(({ colors }) => colors).length +
    monoPalette.colors.length;

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
        <div>{colorCount} colors</div>

        <div className={cx("flex", "flex-row", "p-x5", "gap-x5")}>
          <div className={cx("flex", "flex-col", "gap-x5")}>
            {huePalettes.map((huePalette, i) => (
              <div key={i} className={cx("flex", "flex-row", "gap-x5")}>
                {huePalette.map((saturationPalette, key) => (
                  <ColorPalette
                    key={key}
                    colors={saturationPalette.colors}
                    columns={saturationPalette.width}
                  />
                ))}
              </div>
            ))}
          </div>

          <ColorPalette colors={monoPalette.colors} columns={1} />
        </div>
      </div>
    </div>
  );
}
