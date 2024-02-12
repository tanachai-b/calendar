"use client";

import cx from "classnames";

import { NavBar } from "../components";
import { ColorPalette } from "./ColorPalette";

export default function ColorPickerPage() {
  const div = 8;

  const hexs = Array.from({ length: div + 1 }).map((v, i) =>
    Math.floor(Math.min((i / div) * 256, 255))
      .toString(16)
      .padStart(2, "0")
  );

  const monoColors = {
    width: div + 1,
    colors: Array.from({ length: div + 1 }).map((v, i) =>
      getPaletteMono(hexs, i)
    ),
  };

  const hues = Array.from({ length: 6 }).map((v, hue) =>
    getPalette(div, hexs, hue)
  );

  const colorCount =
    hues.flat(2).flatMap(({ colors }) => colors).length +
    monoColors.colors.length;

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

        <div className={cx("p-x5", "flex", "flex-row", "gap-x5")}>
          <div className={cx("flex", "flex-col", "gap-x5")}>
            {hues.map((palettes, i) => (
              <div key={i} className={cx("flex", "flex-row", "gap-x5")}>
                {palettes.map((palette, key) => (
                  <ColorPalette
                    key={key}
                    colors={palette.colors}
                    columns={palette.width}
                  />
                ))}
              </div>
            ))}
          </div>

          <ColorPalette colors={monoColors.colors} columns={1} />
        </div>
      </div>
    </div>
  );
}

function getPalette(div: number, hexs: string[], hue: number) {
  return Array.from({ length: div + 0 }).map((v, i) => {
    const saturation = div + 1 - i;
    return i >= div / 2
      ? {
          width: saturation - 1,
          colors: Array.from({ length: div + 1 - saturation + 1 }).flatMap(
            (v, i) => {
              const brightness = div + 1 - saturation - i;
              return Array.from({ length: saturation - 1 }).map((v, step) =>
                getColor(hexs, hue, saturation, brightness, step)
              );
            }
          ),
        }
      : {
          width: div + 1 - saturation + 1,
          colors: flipArray(
            saturation - 1,
            Array.from({ length: div + 1 - saturation + 1 }).flatMap((v, i) => {
              const brightness = div + 1 - saturation - i;
              return Array.from({ length: saturation - 1 }).map((v, step) =>
                getColor(hexs, hue, saturation, brightness, step)
              );
            })
          ),
        };
  });
}

function getPaletteMono(hexs: string[], step: number) {
  return `#${hexs.slice(-step - 1)[0]}${hexs.slice(-step - 1)[0]}${
    hexs.slice(-step - 1)[0]
  }`;
}

function getColor(
  hexs: string[],
  hue: number,
  saturation: number,
  brightness: number,
  step: number
) {
  const min = hexs[brightness];
  const max = hexs[brightness + saturation - 1];

  const x = [
    () => `#${max}${hexs[brightness + saturation - 1 - step]}${min}`,
    () => `#${max}${min}${hexs[brightness + step]}`,
    () => `#${hexs[brightness + saturation - 1 - step]}${min}${max}`,
    () => `#${min}${hexs[brightness + step]}${max}`,
    () => `#${min}${max}${hexs[brightness + saturation - 1 - step]}`,
    () => `#${hexs[brightness + step]}${max}${min}`,
  ];
  return x[hue]();
}

function flipArray(cols: number, array: string[]) {
  const rows = Math.ceil(array.length / cols);

  return Array.from({ length: cols }).flatMap((v, col) =>
    Array.from({ length: rows }).map((v, row) => array[row * cols + col])
  );
}
