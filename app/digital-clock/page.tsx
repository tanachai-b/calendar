"use client";

import cx from "classnames";

import { NavBar } from "../components";

export default function DigitalClock() {
  return (
    <div
      className={cx("h-full", "flex", "flex-col", "bg-black", "select-none")}
    >
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div
        className={cx("grow", "flex", "items-center", "justify-center")}
      ></div>
    </div>
  );
}
