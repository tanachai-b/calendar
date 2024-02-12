"use client";

import cx from "classnames";

export function ColorPalette({ colorRows }: { colorRows: string[][] }) {
  return (
    <div className={cx("flex", "flex-col", "p-x10", "gap-x5")}>
      {colorRows.map((colors, key) => (
        <div key={key} className={cx("size-fit", "flex", "flex-row", "gap-x5")}>
          {colors.map((color, key) => (
            <ColorCard key={key} color={color} />
          ))}
        </div>
      ))}
    </div>
  );
}

function ColorCard({ color }: { color: string }) {
  return color === "none" ? (
    <div className={cx("size-x50")} />
  ) : (
    <div className={cx("size-x50", "bg-black", "p-x1")}>
      <div
        className={cx(
          "size-full",

          "border-x2",
          "border-white",

          "p-x2",
          "text-x10",
          "font-semibold",
          "leading-none"
        )}
        style={{ background: color, color: textColor(color) }}
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

  return r + g * 2 + b * 0.25 > 128 + 128 + 128 ? "#000000" : "#ffffff";
}
