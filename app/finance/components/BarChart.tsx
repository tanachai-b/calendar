import cx from "classnames";
import { CSSProperties } from "react";

export function BarChart({
  className,
  style,
  bars,
  onMouseOver,
  onMouseLeave,
}: {
  className?: string;
  style?: CSSProperties;
  bars: { color: string; percentage: number }[];
  onMouseOver?: (index: number) => void;
  onMouseLeave?: () => void;
}) {
  const totalPercentage = bars.reduce(
    (total, bar) => (total += bar.percentage),
    0
  );

  return (
    <div
      className={cx(
        "rounded-full",

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
          className={cx("transition-all")}
          style={{
            backgroundColor: bar.color,
            width: `${bar.percentage * 100}%`,
          }}
          onMouseOver={() => onMouseOver?.(index)}
          onMouseLeave={onMouseLeave}
        />
      ))}

      <div
        className={cx("transition-all")}
        style={{
          backgroundColor: "#00000020",
          width: `${(1 - totalPercentage) * 100}%`,
        }}
      />
    </div>
  );
}
