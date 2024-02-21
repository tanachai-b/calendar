import cx from "classnames";

import { Card } from "../components/Card";
import { accounts } from "../sample-data";
import { AccountRow } from "./AccountRow";
import { InteractiveBarChart } from "./InteractiveBarChart";

export function AccountsCard() {
  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  const accountGroups = group(accounts, (account) => account.bank);

  const chartData = accountGroups
    .flatMap((group) => group.members)
    .map((account) => ({
      color: account.color,
      label: account.name,
      value: account.balance,
    }));

  return (
    <Card className={cx("max-w-x500", "flex", "flex-col")}>
      <div className={cx("p-x10", "pb-x0", "text-x20", "font-light")}>
        Accounts
      </div>

      <div className={cx("p-x20")}>
        <InteractiveBarChart chartData={chartData} totalValue={totalBalance} />
      </div>

      <div className={cx("flex", "flex-col", "pb-x10")}>
        {accountGroups.map((group) => (
          <>
            <GroupName text={group.name} />

            {group.members.map((account, index) => (
              <AccountRow
                key={index}
                color={account.color}
                name={account.name}
                number={account.number}
                balance={account.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
                percentage={account.balance / totalBalance}
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
