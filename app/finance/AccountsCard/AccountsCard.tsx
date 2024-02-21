import cx from "classnames";
import { useState } from "react";

import { Card } from "../components/Card";
import { AccountRow } from "./AccountRow";
import { InteractiveBarChart } from "./InteractiveBarChart";

export function AccountsCard({
  accounts = [],
}: {
  accounts?: {
    bank: string;
    color: string;
    name: string;
    number: string;
    balance: number;
  }[];
}) {
  const sortedAccounts = accounts.sort((a, b) => b.balance - a.balance);

  const totalBalance = sortedAccounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  const accountGroups = groups(sortedAccounts, (account) => account.bank);

  const chartBars = accountGroups
    .flatMap((group) => group.members)
    .map((account) => ({
      color: account.color,
      label: account.name,
      value: account.balance,
    }));

  const [focusAccount, setFocusAccount] = useState<string>();
  const focusIndex = chartBars.findIndex((bar) => bar.label === focusAccount);

  return (
    <Card className={cx("max-w-x500", "flex", "flex-col")}>
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

      <div className={cx("flex", "flex-col", "pb-x10")}>
        {accountGroups.map((group) => (
          <>
            <GroupName text={group.name} />

            {group.members.map((account, index) => (
              <AccountRow
                key={index}
                className={cx({
                  "opacity-50":
                    focusAccount != null && focusAccount !== account.name,
                })}
                color={account.color}
                name={account.name}
                number={account.number}
                balance={account.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
                percentage={account.balance / totalBalance}
                onMouseOver={() => setFocusAccount(account.name)}
                onMouseLeave={() => setFocusAccount(undefined)}
              />
            ))}
          </>
        ))}
      </div>
    </Card>
  );
}

function groups<T>(items: T[], groupBy: (item: T) => string) {
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
        "p-x10",
        "pb-x0",

        "text-[#00000080]",

        "flex",
        "flex-row",
        "gap-x5",
        "items-center"
      )}
    >
      {text}

      <div
        className={cx("grow", "h-full", "border-b-x1", "border-[#00000020]")}
      />
    </div>
  );
}
