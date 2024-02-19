"use client";

import cx from "classnames";
import { ReactNode } from "react";

import { Card } from "./Card";
import { accounts } from "./sample-data";

export function AccountsCard() {
  const accountGroups = group(accounts, (account) => account.bank);

  return (
    <Card className={cx("size-fit", "flex", "flex-col")}>
      <div className={cx("p-x10", "pb-x0", "text-x20", "font-light")}>
        Accounts
      </div>

      <div className={cx("flex", "flex-col", "p-x10", "gap-x10")}>
        {accountGroups.map((group, index) => (
          <AccountGroup key={index} name={group.name}>
            {group.members.map((account, index) => (
              <AccountGroupMember key={index} {...account} />
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
}: {
  color: string;
  name: string;
  number: string;
  balance: number;
}) {
  return (
    <div
      className={cx(
        "grid",
        "grid-flow-col",
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
      <div className={cx("row-span-2", "h-full", "pl-x10")}>
        <span className={cx("text-x20", "font-light", "leading-none")}>
          {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
        <span className={cx("text-[#00000080]")}> THB</span>
      </div>
    </div>
  );
}
