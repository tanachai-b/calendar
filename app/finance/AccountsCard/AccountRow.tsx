import cx from "classnames";

import { HTMLAttributes } from "react";

import { BarChart } from "../components/BarChart";

export function AccountRow({
  color,
  name,
  number,
  balance,
  percentage,
  ...props
}: {
  color: string;
  name: string;
  number: string;
  balance: string;
  percentage: number;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cx(
        "flex",
        "flex-row",
        "flex-wrap",

        "px-x20",
        "py-x5",
        "gap-x10",

        "transition-all",

        props.className
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

        <div>{name}</div>

        <div />

        <div className={cx("text-[#00000080]")}>{number}</div>
      </div>

      <div className={cx("grow", "flex", "flex-col", "items-end", "gap-x5")}>
        <div>
          <span className={cx("text-x15")}>{balance}</span>

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
