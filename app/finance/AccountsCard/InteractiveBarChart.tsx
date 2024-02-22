import cx from "classnames";

import { BarChart } from "../components/BarChart";

export function InteractiveBarChart({
  bars,
  totalValue,
  focus,
  onFocusChange,
}: {
  bars: { color: string; label: string; value: number }[];
  totalValue: number;
  focus?: number;
  onFocusChange?: (focus?: number) => void;
}) {
  const reColoredBars = bars.map((bar, index) => ({
    ...bar,
    color:
      `${bar.color.slice(0, 7)}` +
      `${focus != null && focus !== index ? "40" : "ff"}`,
  }));

  const legend =
    focus != null
      ? bars[focus]
      : { color: `#00000020`, label: "Total", value: totalValue };

  return (
    <div className={cx("flex", "flex-col", "w-full")}>
      <BarChart
        className={cx("h-x20")}
        bars={reColoredBars.map((bar) => ({
          color: bar.color,
          percentage: bar.value / totalValue,
        }))}
        onMouseOver={onFocusChange}
        onMouseLeave={() => onFocusChange?.(undefined)}
      />

      <Legend
        color={legend.color}
        label={legend.label}
        value={legend.value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      />
    </div>
  );
}

function Legend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className={cx("flex", "flex-row", "items-center", "gap-x5")}>
      <div
        className={cx("rounded-full", "size-x15", "transition-all")}
        style={{ backgroundColor: color }}
      />

      <div className={cx("grow", "text-[#00000080]")}>{label} </div>

      <div className={cx("shrink-0", "text-right")}>
        <span className={cx("text-x20", "font-light")}>{value}</span>

        <span className={cx("text-[#00000080]")}> THB</span>
      </div>
    </div>
  );
}
