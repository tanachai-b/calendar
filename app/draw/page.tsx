"use client";

import cx from "classnames";

import { NavBar } from "../components";
import { useEffect, useRef, useState } from "react";

export default function Draw() {
  const ref = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [value, setValue] = useState<number>(360 * 60 * 12 * Math.random());

  const [timer, setTimer] = useState<NodeJS.Timeout>();

  function move({ movementX, movementY }: MouseEvent): void {
    if (!isMouseDown) return;
    setValue(
      (value) =>
        value +
        Math.abs(movementX + movementY) ** 2 * Math.sign(movementX + movementY)
    );
  }

  function up() {
    setIsMouseDown(false);
    document.exitPointerLock();
  }

  useEffect(() => {
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
  }, [document, isMouseDown]);

  useEffect(() => {
    clearInterval(timer);
    setTimer(
      setInterval(() => {
        const val =
          new Date().getHours() * 360 * 60 +
          new Date().getMinutes() * 360 +
          (new Date().getSeconds() * 360) / 60 +
          (new Date().getMilliseconds() * 360) / 60 / 1000;
        setValue(val);
      }, 1000 / 60)
    );
  }, []);

  return (
    <div
      className={cx("h-full", "flex", "flex-col", "bg-black", "select-none")}
    >
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div
        ref={ref}
        className={cx("grow", "flex", "items-center", "justify-center")}
        onMouseDown={() => {
          setIsMouseDown(true);
          ref.current?.requestPointerLock();
        }}
      >
        <div className={cx("w-x700", "h-x700")}>
          <svg viewBox="0 0 500 500">
            <filter id="shadow">
              <feDropShadow
                dx="3"
                dy="3"
                stdDeviation="5"
                floodOpacity="0.75"
              />
            </filter>

            <circle cx="250" cy="250" r="240" fill="#101010" />

            <g fill="#e0e0e0">
              <circle
                cx="250"
                cy="250"
                r="240"
                fill="transparent"
                stroke="#e0e0e0"
                strokeWidth="3"
              />

              {Array.from({ length: 60 * 4 }).map((v, i) => (
                <rect
                  key={i}
                  x="-0.5"
                  y="-240"
                  width="1"
                  height="10"
                  transform={cx(
                    `rotate(${(i / 60 / 4) * 360}, 250, 250)`,
                    "translate(250, 250)"
                  )}
                />
              ))}

              {Array.from({ length: 60 }).map((v, i) => (
                <rect
                  key={i}
                  x="-1.5"
                  y="-240"
                  width="3"
                  height="20"
                  transform={cx(
                    `rotate(${(i / 60) * 360}, 250, 250)`,
                    "translate(250, 250)"
                  )}
                />
              ))}

              {Array.from({ length: 12 }).map((v, i) => (
                <rect
                  key={i}
                  x="-7.5"
                  y="-240"
                  width="15"
                  height="20"
                  transform={cx(
                    `rotate(${(i / 12) * 360}, 250, 250)`,
                    "translate(250, 250)"
                  )}
                />
              ))}

              {Array.from({ length: 12 }).map((v, i) => (
                <text
                  key={i}
                  x={250 + 180 * Math.sin(((i + 1) / 12) * 2 * Math.PI)}
                  y={250 - 180 * Math.cos(((i + 1) / 12) * 2 * Math.PI)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={cx("text-x50", "font-medium")}
                  transform={`translate(0, 7)`}
                >
                  {i + 1}
                </text>
              ))}
            </g>

            <g fill="#e0e0e0">
              <rect
                x="-60"
                y="-20"
                width="120"
                height="40"
                fill="transparent"
                stroke="#404040"
                strokeWidth="1"
                transform={cx("translate(250.5,167.5)")}
              ></rect>

              <text
                x={250}
                y={250 - 80}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cx("text-x30", "font-semibold")}
              >
                JAN 28
              </text>
            </g>

            <g fill="#e0e0e0">
              <rect
                x="-5"
                y="-150"
                width="10"
                height="150"
                transform={cx(
                  `rotate(${value / 60 / 12}, 250, 250)`,
                  "translate(250, 250)"
                )}
              />
            </g>

            <g fill="#e0e0e0">
              <rect
                x="-5"
                y="-200"
                width="10"
                height="200"
                transform={cx(
                  `rotate(${value / 60}, 250, 250)`,
                  "translate(250, 250)"
                )}
              />

              <circle cx="250" cy="250" r="15" />
            </g>

            <g fill="#e00000">
              <rect
                x="-3.5"
                y="-220"
                width="7"
                height="300"
                transform={cx(
                  `rotate(${value}, 250, 250)`,
                  "translate(250, 250)"
                )}
              />

              <circle cx="250" cy="250" r="10" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
