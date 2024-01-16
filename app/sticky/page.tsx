"use client";

import cx from "classnames";
import { useEffect, useState } from "react";

import { NavBar } from "../components";
import { StickyBoard, stickyBoardData } from "./StickyBoard";

export default function StickyPage() {
  const [data, setData] = useState<stickyBoardData[]>([]);

  useEffect(() => {
    setData(
      Array.from({ length: 8 }).map((_value, index) => ({
        x: 70 + index * 10,
        y: 70 + index * 10,
        rotate: 10 * Math.random() - 10 / 2,
        color: index,
      }))
    );
  }, []);

  return (
    <div className={cx("h-full", "flex", "flex-col")}>
      <NavBar className={cx("border-b", "border-highlight-yellow")} />

      <StickyBoard className={cx("grow")} data={data} onDataChanged={setData} />
    </div>
  );
}
