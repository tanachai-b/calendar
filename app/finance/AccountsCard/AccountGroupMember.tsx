import cx from "classnames";

import { BarChart } from "../components/BarChart";

export function AccountGroupMember({
  color,
  name,
  number,
  balance,
  percentage,
}: {
  color: string;
  name: string;
  number: string;
  balance: number;
  percentage: number;
}) {
  return (
    <div
      className={cx(
        "grid",
        "grid-flow-col",
        "grid-rows-[repeat(2,auto)]",
        "grid-cols-[auto,1fr,auto]",
        "gap-x-x10",
        "items-center"
      )}
    >
      <div
        className={cx("rounded-full", "size-x15")}
        style={{ backgroundColor: color }}
      />
      <div />

      <div className={cx("font-medium")}>{name}</div>

      <div className={cx("text-[#00000080]")}>{number}</div>

      <div className={cx("h-full", "pl-x10", "text-right")}>
        <span className={cx("text-x20", "font-light", "leading-none")}>
          {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>

        <span className={cx("text-[#00000080]")}> THB</span>
      </div>

      <div
        className={cx(
          "size-full",
          "pt-x5",

          "flex",
          "flex-row",
          "justify-end",
          "items-start"
        )}
      >
        <BarChart
          className={cx("h-x7", "w-x150")}
          bars={[{ color: color, value: percentage }]}
          maxValue={1}
        />
      </div>
    </div>
  );
}
