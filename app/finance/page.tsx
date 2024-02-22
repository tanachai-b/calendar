"use client";

import cx from "classnames";

import { NavBar } from "../components";
import { AccountsCard } from "./AccountsCard/AccountsCard";
import { BanksCard } from "./BanksCard";
import { accounts } from "./sample-data";
import { TransactionsCard } from "./TransactionsCard";

import "./page.css";

export default function Finance() {
  return (
    <div
      className={cx(
        "h-full",

        "flex",
        "flex-col",
        "bg-black"
      )}
    >
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div
        className={cx(
          "grow",

          "bg-[#202020]",
          "text-x13",
          "text-[#000000ff]",

          "overflow-auto",
          "light-scroll-bar"
        )}
      >
        <div
          className={cx(
            "size-full",

            "flex",
            "flex-row",
            "p-x20",
            "gap-x20",
            "items-start"
          )}
        >
          <BanksCard />

          <AccountsCard
            className={cx("max-h-full", "w-x500")}
            accounts={accounts}
          />

          <TransactionsCard />
        </div>
      </div>
    </div>
  );
}
