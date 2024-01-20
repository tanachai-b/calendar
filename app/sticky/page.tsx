"use client";

import cx from "classnames";
import { useEffect, useState } from "react";

import { StickyBoard, stickyBoardData } from "./StickyBoard/StickyBoard";
import { sampleData } from "./sampleData";

export default function StickyPage() {
  const STORAGE_KEY = "sticky_data";

  const [data, setData] = useState<stickyBoardData[]>([]);

  useEffect(() => {
    retrieveStorageOrSampleData(STORAGE_KEY, setData);
  }, []);

  function handleDataChanged(data: stickyBoardData[]): void {
    setData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data, undefined, 4));
  }

  return (
    <div className={cx("h-full", "flex", "flex-col")}>
      {/* <NavBar className={cx("border-b", "border-highlight-yellow")} /> */}

      <StickyBoard
        className={cx("grow")}
        data={data}
        onDataChanged={(data) => handleDataChanged(data)}
      />
    </div>
  );
}

function retrieveStorageOrSampleData(
  STORAGE_KEY: string,
  setData: (data: stickyBoardData[]) => void
) {
  (() => {
    const storage = localStorage.getItem(STORAGE_KEY);

    if (storage) {
      setData(JSON.parse(storage));
      return;
    }

    setData(sampleData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData, undefined, 4));
  })();
}
