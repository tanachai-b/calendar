"use client";

import cx from "classnames";
import { NavBar } from "../components";
import { useEffect, useState } from "react";

export default function GlassyClock() {
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
          "bg-[#e0e0e0]"
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
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            </filter>

            <mask id="mask">
              <rect width="100%" height="100%" fill="#ffffff" />

              <use
                href="#text"
                fill="#000000"
                filter="url(#blur)"
                transform="translate(0,20)"
              />
            </mask>

            <mask id="mask2">
              <rect width="100%" height="100%" fill="#ffffff" />

              <use href="#text" fill="#000000" transform="translate(7,15)" />
            </mask>

            <mask id="mask3">
              <rect width="100%" height="100%" fill="#000000" />

              <use href="#text" fill="#ffffff" filter="url(#erode2)" />
            </mask>

            <filter id="erode">
              <feMorphology operator="erode" radius="0" />
            </filter>

            <filter id="erode2">
              <feMorphology operator="erode" radius="3" />
            </filter>

            <filter id="dilate">
              <feMorphology operator="dilate" radius="1" />
            </filter>
          </defs>

          <use href="#text" fill="#000000" filter="url(#dilate)" />

          <use href="#text" fill="#00a0ff" filter="url(#erode)" />

          <use href="#text" fill="#0040c0" mask="url(#mask)" opacity="0.75" />

          <g mask="url(#mask3)">
            <use
              href="#text"
              fill="#ffffff"
              mask="url(#mask2)"
              opacity="0.75"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
