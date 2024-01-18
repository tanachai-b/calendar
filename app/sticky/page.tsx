"use client";

import cx from "classnames";
import { useEffect, useState } from "react";

import { NavBar } from "../components";
import { StickyBoard, stickyBoardData } from "./StickyBoard/StickyBoard";

export default function StickyPage() {
  const STORAGE_KEY = "sticky_data";

  const [data, setData] = useState<stickyBoardData[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem(STORAGE_KEY);

    if (storage) {
      setData(JSON.parse(storage));
      return;
    }

    const randomData = Array.from({ length: 8 }).map((_value, index) => ({
      text: "",
      color: index,
      x: Math.floor(1750 * Math.random()),
      y: Math.floor(750 * Math.random()),
      rotate: Math.floor((10 * Math.random() - 10 / 2) * 10) / 10,
      key: Math.floor(Math.random() * 1000000).toString(36),
    }));
    setData(randomData);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(randomData, undefined, 4));
  }, []);

  function handleDataChanged(data: stickyBoardData[]): void {
    setData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data, undefined, 4));
  }

  return (
    <div className={cx("h-full", "flex", "flex-col")}>
      <NavBar className={cx("border-b", "border-highlight-yellow")} />

      <StickyBoard
        className={cx("grow")}
        data={data}
        onDataChanged={(data) => handleDataChanged(data)}
      />
    </div>
  );
}
