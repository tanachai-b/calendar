import cx from "classnames";

import { Card } from "../components/Card";
import { accounts } from "../sample-data";
import { AccountGroup } from "./AccountGroup";
import { AccountGroupMember } from "./AccountGroupMember";
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

      <div className={cx("flex", "flex-col", "p-x10", "gap-x10")}>
        {accountGroups.map((group, index) => (
          <AccountGroup key={index} name={group.name}>
            {group.members.map((account, index) => (
              <AccountGroupMember
                key={index}
                {...account}
                percentage={account.balance / totalBalance}
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
