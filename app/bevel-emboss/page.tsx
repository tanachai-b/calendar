"use client";

import cx from "classnames";
import { NavBar } from "../components";
import { useEffect, useState } from "react";

export default function BevelEmboss() {
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

      <div
        className={cx(
          "grow",
          "flex",
          "items-center",
          "justify-center",
          "bg-[#ffe000]"
        )}
      >
        <svg width="1500" height="300">
          <defs>
            <text
              id="text"
              x="50%"
              y="50%"
              textAnchor="middle"
              alignmentBaseline="central"
              fontSize="300px"
              className={cx("tabular-nums", "font-bold")}
            >
              {text}
            </text>

            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            </filter>

            <mask id="mask">
              <rect width="100%" height="100%" fill="#ffffff" />

              <use
                href="#text"
                fill="#000000"
                filter="url(#blur)"
                transform="translate(20,20)"
              />
            </mask>

            <filter id="erode">
              <feMorphology operator="erode" radius="0" />
            </filter>
          </defs>

          <use
            href="#text"
            fill="#000000"
            transform="translate(-1,-1)"
            opacity="0.5"
          />

          <use
            href="#text"
            fill="#ffffff"
            transform="translate(1,1)"
            opacity="0.5"
          />

          <use href="#text" fill="#ffe000" filter="url(#erode)" />

          <use href="#text" fill="#000000" mask="url(#mask)" opacity="0.75" />
        </svg>
      </div>
    </div>
  );
}
