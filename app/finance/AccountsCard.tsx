"use client";

import cx from "classnames";

import { Card } from "./Card";
import { accounts, banks } from "./sample-data";

export function AccountsCard() {
  const accountBanks = Array.from(new Set(accounts.map(({ bank }) => bank)));

  const mappedAccounts = accountBanks.map((accountBank) => {
    const bank = banks.find(({ name }) => name === accountBank);
    return {
      ...bank,
      displayName: `${bank?.name} (${bank?.acronym})`,
      accounts: accounts.filter((account) => account.bank === bank?.name),
    };
  });

  return (
    <Card className={cx("size-fit", "flex", "flex-col")}>
      <div className={cx("p-x10", "pb-x0", "text-x20", "font-light")}>
        Accounts
      </div>

      <div className={cx("flex", "flex-col", "p-x10", "gap-x10")}>
        {mappedAccounts.map((bank, index) => (
          <BankListItem
            key={index}
            bank={bank.displayName}
            mappedAccounts={bank.accounts}
          />
        ))}
      </div>
    </Card>
  );
}
function BankListItem({
  bank,
  mappedAccounts,
}: {
  bank: string;
  mappedAccounts: {
    bank: string;
    color: string;
    name: string;
    number: string;
    balance: number;
  }[];
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
        {bank}
      </div>

      <div className={cx("flex", "flex-col", "p-x10", "gap-x10")}>
        {mappedAccounts.map((account, index) => (
          <AccountListItem key={index} {...account} />
        ))}
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
