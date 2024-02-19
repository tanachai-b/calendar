"use client";

import cx from "classnames";
import { CSSProperties, ReactNode } from "react";

import { Card } from "./Card";
import { accounts } from "./sample-data";

export function AccountsCard() {
  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  const accountGroups = group(accounts, (account) => account.bank);

  const chartData = accountGroups
    .flatMap((group) => group.members)
    .map((account) => ({ color: account.color, value: account.balance }));

  return (
    <Card className={cx("w-x500", "flex", "flex-col")}>
      <div className={cx("p-x10", "pb-x0", "text-x20", "font-light")}>
        Accounts
      </div>

      <div className={cx("p-x20", "flex", "flex-col")}>
        <BarChart className={cx("h-x20")} bars={chartData} />

        <div
          className={cx(
            "flex",
            "flex-row",
            "items-baseline",
            "justify-between"
          )}
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

      <div className={cx("flex", "flex-col", "p-x10", "gap-x10")}>
        {accountGroups.map((group, index) => (
          <AccountGroup key={index} name={group.name}>
            {group.members.map((account, index) => (
              <AccountGroupMember
                key={index}
                {...account}
                percent={account.balance / totalBalance}
              />
            ))}
          </AccountGroup>
        ))}
      </div>
    </Card>
  );
}

function group<T>(items: T[], groupBy: (item: T) => string) {
  return items.reduce<{ name: string; members: T[] }[]>((groups, item) => {
    const group = groups.find((group) => group.name === groupBy(item));
    if (!group) {
      return [...groups, { name: groupBy(item), members: [item] }];
    } else {
      group.members.push(item);
      return groups;
    }
  }, []);
}

function AccountGroup({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div
        className={cx(
          "flex",
          "flex-row",

          "gap-x10",
          "items-center",

          "text-[#00000080]"
        )}
      >
        {name}
      </div>

      <div className={cx("flex", "flex-col", "p-x10", "gap-x10")}>
        {children}
      </div>
    </div>
  );
}

function AccountGroupMember({
  color,
  name,
  number,
  balance,
  percent,
}: {
  color: string;
  name: string;
  number: string;
  balance: number;
  percent: number;
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

      <div className={cx("flex", "flex-row", "justify-end")}>
        <BarChart
          className={cx("h-x7", "w-x150")}
          bars={[{ color: color, value: percent }]}
          maxValue={1}
        />
      </div>
    </div>
  );
}

function BarChart({
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
