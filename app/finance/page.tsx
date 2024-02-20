"use client";

import cx from "classnames";

import { NavBar } from "../components";
import { AccountsCard } from "./AccountsCard/AccountsCard";
import { BanksCard } from "./BanksCard";

export default function Finance() {
  return (
    <div className={cx("h-full", "flex", "flex-col", "bg-black")}>
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div
        className={cx(
          "grow",
          "overflow-scroll",

          "bg-[#202020]",
          "text-x13",
          "text-[#000000ff]"
        )}
      >
        <div className={cx("flex", "flex-col", "p-x20", "gap-x20")}>
          <AccountsCard />

          <BanksCard />
        </div>
      </div>
    </div>
  );
}
