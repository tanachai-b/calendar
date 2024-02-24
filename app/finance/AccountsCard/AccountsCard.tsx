import cx from "classnames";
import { HTMLAttributes, useState } from "react";

import { Card } from "../components/Card";
import { AccountRow } from "./AccountRow";
import { InteractiveBarChart } from "./InteractiveBarChart";

import "../page.css";

export function AccountsCard({
  accounts = [],
  ...props
}: {
  accounts?: {
    bank: string;
    color: string;
    name: string;
    number: string;
    balance: number;
  }[];
} & HTMLAttributes<HTMLDivElement>) {
  const sortedAccounts = accounts
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => b.balance - a.balance);

  const totalBalance = sortedAccounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  const groups = group(sortedAccounts, (account) => account.bank);

  const groupsWithTotal = groups.map((group) => ({
    ...group,
    total: group.members.reduce(
      (total, account) => (total += account.balance),
      0
    ),
  }));

  const sortedGroups = groupsWithTotal.sort((a, b) => b.total - a.total);

  const chartBars = sortedGroups
    .flatMap((group) => group.members)
    .map((account) => ({
      color: account.color,
      label: account.name,
      value: account.balance,
    }));

  const [focusAccount, setFocusAccount] = useState<string>();
  const focusIndex = chartBars.findIndex((bar) => bar.label === focusAccount);

  return (
    <Card
      {...props}
      className={cx("flex", "flex-col", "overflow-hidden", props.className)}
    >
      <div className={cx("p-x10", "pb-x0", "text-x20", "font-light")}>
        Accounts
      </div>

      <div className={cx("p-x20")}>
        <InteractiveBarChart
          bars={chartBars}
          totalValue={totalBalance}
          focus={focusIndex >= 0 ? focusIndex : undefined}
          onFocusChange={(index) =>
            setFocusAccount(index != null ? chartBars[index].label : undefined)
          }
        />
      </div>

      <div
        className={cx(
          "grow",

          "flex",
          "flex-col",
          "pb-x10",

          "overflow-auto",
          "dark-scroll-bar"
        )}
      >
        {sortedGroups.map((group, groupIndex) => (
          <>
            <GroupName key={groupIndex} text={group.name} />

            {group.members.map((account, index) => (
              <AccountRow
                key={`${groupIndex}-${index}`}
                // className={cx({
                //   "opacity-50":
                //     focusAccount != null && focusAccount !== account.name,
                // })}
                color={account.color}
                name={account.name}
                number={account.number}
                balance={account.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
                percentage={account.balance / totalBalance}
                // onMouseOver={() => setFocusAccount(account.name)}
                // onMouseLeave={() => setFocusAccount(undefined)}
              />
            ))}
          </>
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

function GroupName({ text }: { text: string }) {
  return (
    <div
      className={cx(
        "px-x10",

        "text-[#00000080]",

        "flex",
        "flex-row",
        "gap-x5",
        "items-center"
      )}
    >
      {text}

      <div className={cx("grow", "border-b-x1", "border-[#00000020]")} />
    </div>
  );
}
