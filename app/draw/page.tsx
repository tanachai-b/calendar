"use client";

import cx from "classnames";

import { NavBar } from "../components";
import { useEffect, useRef, useState } from "react";

export default function Draw() {
  const ref = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [value, setValue] = useState<number>(360 * 60 * 12 * Math.random());

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
    const timer = setInterval(() => {
      if (isMouseDown) return;

      const val =
        new Date().getHours() * 360 * 60 +
        new Date().getMinutes() * 360 +
        (new Date().getSeconds() * 360) / 60 +
        (new Date().getMilliseconds() * 360) / 60 / 1000;
      setValue(val);
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isMouseDown]);

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

            <circle cx="250" cy="250" r="250" fill="#101010" />

            <g fill="#e0e0e0">
              <circle
                cx={250}
                cy={250}
                r={250 - 2 / 2}
                fill="transparent"
                stroke="#e0e0e0"
                strokeWidth={2}
              />

              {Array.from({ length: 60 * 4 }).map((v, i) => (
                <rect
                  key={i}
                  x={-2 / 2}
                  y={-250}
                  width={2}
                  height={10}
                  transform={cx(
                    `rotate(${(i / 60 / 4) * 360}, 250, 250)`,
                    "translate(250, 250)"
                  )}
                />
              ))}

              {Array.from({ length: 60 }).map((v, i) => (
                <rect
                  key={i}
                  x={-3 / 2}
                  y={-250}
                  width={3}
                  height={25}
                  transform={cx(
                    `rotate(${(i / 60) * 360}, 250, 250)`,
                    "translate(250, 250)"
                  )}
                />
              ))}

              {Array.from({ length: 12 }).map((v, i) => (
                <rect
                  key={i}
                  x={-15 / 2}
                  y={-235}
                  width={15}
                  height={i % 3 === 0 ? 20 : 50}
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
                  className={cx("text-x70", "font-semibold")}
                  transform={`translate(0, 7)`}
                >
                  {(i + 1) % 3 === 0 ? i + 1 : ""}
                </text>
              ))}
            </g>

            {/* <g fill="#e0e0e0">
              <rect
                x={-60}
                y={-20}
                width={120}
                height={40}
                fill="transparent"
                stroke="#404040"
                strokeWidth="1"
                transform={cx("translate(250.5,167.5)")}
              />

              <text
                x={250}
                y={250 - 80}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cx("text-x30", "font-semibold")}
              >
                JAN 28
              </text>
            </g> */}

            <g fill="#e0e0e0" stroke="#e0e0e0">
              <polygon
                points={cx(
                  `${-20 / 2},${-140}`,
                  `${0},${-150}`,
                  `${20 / 2},${-140}`,
                  `${20 / 2},${0}`,
                  `${-20 / 2},${0}`
                )}
                transform={cx(
                  `rotate(${value / 60 / 12}, 250, 250)`,
                  "translate(250, 250)"
                )}
              />
            </g>

            <g>
              {/* <g fill="#101010" stroke="#101010" strokeWidth={5}>
                <polygon
                  points={cx(
                    `${-20 / 2},${-230}`,
                    `${0},${-240}`,
                    `${20 / 2},${-230}`,
                    `${20 / 2},${0}`,
                    `${-20 / 2},${0}`
                  )}
                  transform={cx(
                    `rotate(${value / 60}, 250, 250)`,
                    "translate(250, 250)"
                  )}
                />

                <circle cx="250" cy="250" r="20" />
              </g> */}

              <g fill="#e0e0e0">
                <polygon
                  points={cx(
                    `${-20 / 2},${-230}`,
                    `${0},${-240}`,
                    `${20 / 2},${-230}`,
                    `${20 / 2},${0}`,
                    `${-20 / 2},${0}`
                  )}
                  transform={cx(
                    `rotate(${value / 60}, 250, 250)`,
                    "translate(250, 250)"
                  )}
                />

                <circle cx="250" cy="250" r="20" />
              </g>
            </g>

            <g>
              {/* <g fill="#101010" stroke="#101010" strokeWidth={5}>
                <polygon
                  points={cx(
                    `${-10 / 2},${-235}`,
                    `${0},${-240}`,
                    `${10 / 2},${-235}`,
                    `${10 / 2},${70}`,
                    `${-10 / 2},${70}`
                  )}
                  transform={cx(
                    `rotate(${value}, 250, 250)`,
                    "translate(250, 250)"
                  )}
                />

                <circle cx="250" cy="250" r="15" />
              </g> */}

              <g fill="#e00000">
                <polygon
                  points={cx(
                    `${-10 / 2},${-235}`,
                    `${0},${-240}`,
                    `${10 / 2},${-235}`,
                    `${10 / 2},${70}`,
                    `${-10 / 2},${70}`
                  )}
                  transform={cx(
                    `rotate(${value}, 250, 250)`,
                    "translate(250, 250)"
                  )}
                />

                <circle cx="250" cy="250" r="15" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
