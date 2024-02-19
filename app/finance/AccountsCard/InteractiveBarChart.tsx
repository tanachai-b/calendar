import cx from "classnames";

import { BarChart } from "../components/BarChart";

export function InteractiveBarChart({
  chartData,
  totalBalance,
}: {
  chartData: { color: string; value: number; label: string }[];
  totalBalance: number;
}) {
  return (
    <div className={cx("flex", "flex-col")}>
      <BarChart className={cx("h-x20")} bars={chartData} />

      <div
        className={cx("flex", "flex-row", "items-baseline", "justify-between")}
      >
        <div className={cx("text-[#00000080]")}>Total </div>
        <div>
          <span className={cx("text-x20", "font-light")}>
            {totalBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
          <span className={cx("text-[#00000080]")}> THB</span>
        </div>
      </div>
    </div>
  );
}
