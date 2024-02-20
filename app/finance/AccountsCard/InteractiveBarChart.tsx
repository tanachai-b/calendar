import cx from "classnames";
import { useState } from "react";

import { BarChart } from "../components/BarChart";

export function InteractiveBarChart({
  chartData,
  totalValue,
}: {
  chartData: { color: string; label: string; value: number }[];
  totalValue: number;
}) {
  const [mouseOverIndex, setMouseOverIndex] = useState<number>();

  const { color, label, value } =
    mouseOverIndex != null
      ? chartData[mouseOverIndex]
      : { color: "#00000020", label: "Total", value: totalValue };

  return (
    <div className={cx("flex", "flex-col", "w-full")}>
      <BarChart
        className={cx("h-x20")}
        bars={chartData.map((bar) => ({
          color: bar.color,
          percentage: bar.value / totalValue,
        }))}
        onMouseOver={(index) => setMouseOverIndex(index)}
        onMouseLeave={() => setMouseOverIndex(undefined)}
      />

      <LabelValue
        color={color}
        label={label}
        value={value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      />
    </div>
  );
}

function LabelValue({
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
        className={cx("rounded-full", "size-x15")}
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
