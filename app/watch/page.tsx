"use client";

import cx from "classnames";

import { NavBar } from "../components";
import { Watch } from "./Watch";
import { useWatchDrag } from "./useWatchDrag";

export default function WatchPage() {
  const { ref, value, handleMouseDown } = useWatchDrag();

  return (
    <div
      className={cx("h-full", "flex", "flex-col", "bg-black", "select-none")}
    >
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div
        ref={ref}
        className={cx("grow", "flex", "items-center", "justify-center")}
        onMouseDown={handleMouseDown}
      >
        <Watch className={cx("w-x700", "h-x700")} value={value} />
      </div>
    </div>
  );
}
