"use client";

import cx from "classnames";

import { NavBar } from "../components";
import { BanksCard } from "./BanksCard";
import { Card } from "./Card";
import { bankAccounts } from "./sample-data";

export default function Finance() {
  return (
    <div className={cx("h-full", "flex", "flex-col", "bg-black")}>
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div
        className={cx("grow", "bg-[#202020]", "text-x13", "text-[#000000ff]")}
      >
        <div className={cx("flex", "flex-col", "p-x20", "gap-x20")}>
          <BanksCard />

          <AccountsCard />
        </div>
      </div>
    </div>
  );
}

function AccountsCard() {
  return (
    <Card className={cx("size-fit", "flex", "flex-col")}>
      <div className={cx("p-x10", "pb-x0", "text-x20", "font-light")}>
        Accounts
      </div>

      <div className={cx("flex", "flex-col", "p-x20", "gap-x20")}>
        {bankAccounts.map((account, index) => (
          <div key={index}>
            <div className={cx("flex", "flex-row", "gap-x10")}>
              <div
                className={cx("rounded-full", "size-x15")}
                style={{ backgroundColor: account.color }}
              />

              <div className={cx("grow", "flex", "flex-col")}>
                <div className={cx("text-x15")}>{account.name}</div>
                <div className={cx("opacity-50")}>{account.number}</div>
                <div className={cx("opacity-50")}>{account.bank}</div>
              </div>

              <div className={cx("text-x20", "font-light")}>
                {account.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div
        className={cx("grid", "grid-cols-[repeat(4,auto)]", "p-x20", "gap-x20")}
      >
        {bankAccounts.map((account, index) => (
          <>
            <div key={index * 4 + 0}>{account.name}</div>
            <div key={index * 4 + 1}>{account.number}</div>
            <div key={index * 4 + 2}>{account.bank}</div>
            <div key={index * 4 + 3}>
              {account.balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
          </>
        ))}
      </div> */}
    </Card>
  );
}

function textColor(color: string) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const [rf, gf, bf] = [2, 4, 1];

  return r * rf + g * gf + b * bf > 256 * (rf + gf + bf) * (4 / 8)
    ? "#000000"
    : "#ffffff";
}
