import cx from "classnames";

import { BarChart } from "../components/BarChart";

export function AccountRow({
  color,
  name,
  number,
  balance,
  percentage,
}: {
  color: string;
  name: string;
  number: string;
  balance: string;
  percentage: number;
}) {
  return (
    <div
      className={cx(
        "flex",
        "flex-row",
        "flex-wrap",

        "px-x20",
        "py-x10",
        "gap-x10",

        "hover:bg-[#00000010]",
        "active:bg-[#00000020]",
        "transition-all"
      )}
    >
      <div
        className={cx(
          "grow",

          "grid",
          "grid-cols-[auto_1fr]",
          "gap-x-x5",
          "items-center"
        )}
      >
        <div
          className={cx("rounded-full", "size-x15")}
          style={{ backgroundColor: color }}
        />

        <div className={cx("font-medium")}>{name}</div>

        <div />

        <div className={cx("text-[#00000080]")}>{number}</div>
      </div>

      <div className={cx("grow", "flex", "flex-col", "items-end", "gap-x5")}>
        <div>
          <span className={cx("text-x20", "font-light", "leading-none")}>
            {balance}
          </span>

          <span className={cx("text-[#00000080]")}> THB</span>
        </div>

        <BarChart
          className={cx("h-x7", "w-x150")}
          bars={[{ color, percentage }]}
        />
      </div>
    </div>
  );
}
