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
            "leading-none",
            "tabular-nums",
            "font-thin",
            "text-[#ffff00]",
            "blur-x0.5"
          )}
          style={{
            textShadow:
              "0px 0px 15px #ff0000, 0px 0px 30px #ff0000, 0px 0px 70px #ff0000",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
