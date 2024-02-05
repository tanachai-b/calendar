"use client";

import cx from "classnames";
import { NavBar } from "../components";
import { useEffect, useState } from "react";

export default function GlowClock() {
  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(intervalCallback, 1000 / 60);
    return () => clearInterval(interval);
  }, [intervalCallback]);

  function intervalCallback() {
    setText(new Date().toTimeString().slice(0, 8));
  }

  return (
    <div
      className={cx("h-full", "flex", "flex-col", "bg-black", "select-none")}
    >
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div className={cx("grow", "flex", "items-center", "justify-center")}>
        <div
          className={cx(
            "text-[300px]",
            "tabular-nums",
            "font-thin",
            "text-[#ffff00]",
            "blur-x0.5",
            "drop-shadow-[0px_0px_15px_#ff0000]"
            // "scale-[70%]"
          )}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
