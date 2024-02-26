"use client";

import cx from "classnames";

import { NavBar } from "../components";
import { AccountsCard } from "./AccountsCard/AccountsCard";
import { BanksCard } from "./BanksCard";
import { DataInputCard } from "./DataInput";
import { TransactionsCard } from "./TransactionsCard";
import { accounts } from "./sample-data";

import "./page.css";

export default function Finance() {
  return (
    <div
      className={cx(
        "h-full",

        "flex",
        "flex-col",
        "bg-black",

        "overflow-hidden"
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
            "w-fit",
            "h-full",

            "flex",
            "flex-row",
            "p-x20",
            "gap-x20",
            "items-start",

            "overflow-hidden"
          )}
        >
          <BanksCard />

          <AccountsCard
            className={cx("max-h-full", "w-x500")}
            accounts={accounts}
          />

          <TransactionsCard />

          <DataInputCard className={cx("w-[1800px]", "max-h-full")} />
        </div>
      </div>
    </div>
  );
}
