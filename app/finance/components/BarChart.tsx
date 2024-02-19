import cx from "classnames";
import { CSSProperties } from "react";

export function BarChart({
  className,
  style,
  bars,
  maxValue: inputMax,
}: {
  className?: string;
  style?: CSSProperties;
  bars: { color: string; value: number }[];
  maxValue?: number;
}) {
  const maxValue =
    inputMax ?? bars.reduce((total, bar) => total + bar.value, 0);

  return (
    <div
      className={cx(
        "rounded-full",
        "bg-[#00000020]",

        "flex",
        "flex-row",
        "overflow-hidden",

        className
      )}
      style={style}
    >
      {bars.map((bar, index) => (
        <div
          key={index}
          style={{
            backgroundColor: bar.color,
            width: `${(bar.value / maxValue) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
