"use client";

export function useGetPalettes(subdivisions: number) {
  const hexs = Array.from({ length: subdivisions + 1 }).map((v, i) =>
    Math.floor(Math.min((i / subdivisions) * 256, 255))
      .toString(16)
      .padStart(2, "0")
  );

  const huePalettes = Array.from({ length: 6 }).map((v, hue) =>
    getHuePalette(subdivisions, hexs, hue)
  );

  const monoPalette = {
    width: subdivisions + 1,
    colors: Array.from({ length: subdivisions + 1 }).map((v, i) =>
      getMonoPalette(hexs, i)
    ),
  };

  return { huePalettes, monoPalette };
}

function getHuePalette(div: number, hexs: string[], hue: number) {
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

function getColor(
  hexs: string[],
  hue: number,
  saturation: number,
  brightness: number,
  step: number
) {
  const min = hexs[brightness];
  const max = hexs[brightness + saturation - 1];

  const hueFunctions = [
    () => `#${max}${hexs[brightness + saturation - 1 - step]}${min}`,
    () => `#${max}${min}${hexs[brightness + step]}`,
    () => `#${hexs[brightness + saturation - 1 - step]}${min}${max}`,
    () => `#${min}${hexs[brightness + step]}${max}`,
    () => `#${min}${max}${hexs[brightness + saturation - 1 - step]}`,
    () => `#${hexs[brightness + step]}${max}${min}`,
  ];

  return hueFunctions[hue]();
}

function flipArray(cols: number, array: string[]) {
  const rows = Math.ceil(array.length / cols);

  return Array.from({ length: cols }).flatMap((v, col) =>
    Array.from({ length: rows }).map((v, row) => array[row * cols + col])
  );
}

function getMonoPalette(hexs: string[], step: number) {
  return `#${hexs.slice(-step - 1)[0]}${hexs.slice(-step - 1)[0]}${
    hexs.slice(-step - 1)[0]
  }`;
}
