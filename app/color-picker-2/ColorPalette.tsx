"use client";

import cx from "classnames";

export function ColorPalette({
  colors,
  columns,
}: {
  colors: string[];
  columns: number;
}) {
  return (
    <div
      className={cx("size-fit", "grid", "gap-x5")}
      style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}
    >
      {colors.map((color, key) => (
        <ColorCard key={key} color={color} />
      ))}
    </div>
  );
}

function ColorCard({ color }: { color: string }) {
  return (
    <div
      className={cx(
        "size-x70"
        //  "bg-black",
        //  "p-x1"
      )}
    >
      <div
        className={cx(
          "size-full",

          "border-x5",
          // "border-black",

          "p-x2",
          "text-x10",
          "font-semibold",
          "leading-none"
        )}
        style={{
          background: color,
          borderColor: textColor(color),
          color: `${textColor(color)}ff`,
        }}
      >
        {color.toUpperCase().slice(1)}
      </div>
    </div>
  );
}

function textColor(color: string) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const [rf, gf, bf] = [1, 2, 1];

  return r * rf + g * gf + b * bf > 256 * (rf + gf + bf) * (4 / 8)
    ? "#000000"
    : "#ffffff";
}
