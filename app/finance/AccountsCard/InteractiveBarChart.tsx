import cx from "classnames";
import { useState } from "react";

import { BarChart } from "../components/BarChart";

export function InteractiveBarChart({
  chartData,
  totalValue,
}: {
  chartData: { color: string; value: number; label: string }[];
  totalValue: number;
}) {
  const [mouseOverIndex, setMouseOverIndex] = useState<number>();

  const color =
    mouseOverIndex != null ? chartData[mouseOverIndex].color : "#00000020";
  const label =
    mouseOverIndex != null ? chartData[mouseOverIndex].label : "Total";
  const value =
    mouseOverIndex != null ? chartData[mouseOverIndex].value : totalValue;

  return (
    <div className={cx("flex", "flex-col", "w-full")}>
      <BarChart
        className={cx("h-x20")}
        bars={chartData}
        maxValue={totalValue}
        onMouseOver={(index) => setMouseOverIndex(index)}
        onMouseLeave={() => setMouseOverIndex(undefined)}
      />

      <LabelValue color={color} label={label} value={value} />
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
  value: number;
}) {
  return (
    <div className={cx("flex", "flex-row", "items-center", "gap-x5")}>
      <div
        className={cx("rounded-full", "size-x15")}
        style={{ backgroundColor: color }}
      />

      <div className={cx("grow", "text-[#00000080]")}>{label} </div>

      <div className={cx("shrink-0", "text-right")}>
        <span className={cx("text-x20", "font-light")}>
          {value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>

        <span className={cx("text-[#00000080]")}> THB</span>
      </div>
    </div>
  );
}
