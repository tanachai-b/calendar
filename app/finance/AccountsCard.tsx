"use client";

import cx from "classnames";
import { ReactNode } from "react";

import { Card } from "./Card";
import { Account, accounts } from "./sample-data";

export function AccountsCard() {
  const groups = accounts.reduce<{ name: string; accounts: Account[] }[]>(
    (groups, account) => {
      const group = groups.find((group) => group.name === account.bank);
      if (!group) {
        return [...groups, { name: account.bank, accounts: [account] }];
      } else {
        group.accounts.push(account);
        return groups;
      }
    },
    []
  );

  return (
    <Card className={cx("size-fit", "flex", "flex-col")}>
      <div className={cx("p-x10", "pb-x0", "text-x20", "font-light")}>
        Accounts
      </div>

      <div className={cx("flex", "flex-col", "p-x10", "gap-x10")}>
        {groups.map((group, index) => (
          <Group key={index} name={group.name}>
            {group.accounts.map((account, index) => (
              <AccountListItem key={index} {...account} />
            ))}
          </Group>
        ))}
      </div>
    </Card>
  );
}

function Group({ name, children }: { name: string; children: ReactNode }) {
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

function AccountListItem({
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

      <div
        className={cx(
          "row-span-2",
          "h-full",
          "pl-x10",

          "text-x20",
          "font-light",
          "leading-none"
        )}
      >
        {balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </div>
    </div>
  );
}
