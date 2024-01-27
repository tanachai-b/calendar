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
        <div className={cx("w-x700", "h-x700", "xblur-[0.3px]")}>
          <svg viewBox="0 0 500 500">
            <defs>
              <filter id="shadow">
                <feDropShadow
                  dx={5}
                  dy={5}
                  stdDeviation={1}
                  floodOpacity={0.5}
                />
              </filter>

              <filter id="shadow2">
                <feDropShadow
                  dx={3}
                  dy={3}
                  stdDeviation={1}
                  floodOpacity={0.5}
                />
              </filter>
            </defs>

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

            <g>
              <defs>
                <g id="hatch-marks">
                  {Array.from({ length: 12 }).map((v, i) => (
                    <rect
                      key={i}
                      x={-10 / 2}
                      y={-235}
                      width={10}
                      height={i % 3 === 0 ? 20 : 50}
                      transform={cx(
                        `rotate(${(i / 12) * 360}, 250, 250)`,
                        "translate(250, 250)"
                      )}
                    />
                  ))}
                </g>
              </defs>

              <g
                fill="#e0e0e0"
                stroke="#e0e0e0"
                strokeWidth={5}
                filter="url(#shadow2)"
              >
                <use href="#hatch-marks" />
              </g>

              <g fill="#c0c0c0" transform={`translate(${5 / 2}, ${5 / 2})`}>
                <use href="#hatch-marks" />
              </g>

              <g fill="#ffffff" transform={`translate(${-5 / 2}, ${-5 / 2})`}>
                <use href="#hatch-marks" />
              </g>

              <g fill="#e0e0e0">
                <use href="#hatch-marks" />
              </g>
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

            <g>
              <defs>
                <g id="hour-hand">
                  <polygon
                    points={cx(
                      `${-30 / 2},${-130}`,
                      `${0},${-150}`,
                      `${30 / 2},${-130}`,
                      `${30 / 2},${0}`,
                      `${-30 / 2},${0}`,
                      `${-30 / 2},${-130}`,

                      `${-25 / 2},${-110}`,
                      `${-25 / 2},${-20}`,
                      `${25 / 2},${-20}`,
                      `${25 / 2},${-110}`,
                      `${-25 / 2},${-110}`
                    )}
                    transform={cx(
                      `rotate(${value / 60 / 12}, 250, 250)`,
                      "translate(250, 250)"
                    )}
                  />
                </g>
              </defs>

              <g
                fill="#e0e0e0"
                stroke="#e0e0e0"
                strokeWidth={5}
                filter="url(#shadow)"
              >
                <use href="#hour-hand" />
              </g>

              <g fill="#c0c0c0" transform={`translate(${5 / 2}, ${5 / 2})`}>
                <use href="#hour-hand" />
              </g>

              <g fill="#ffffff" transform={`translate(${-5 / 2}, ${-5 / 2})`}>
                <use href="#hour-hand" />
              </g>

              <g fill="#e0e0e0">
                <use href="#hour-hand" />
              </g>
            </g>

            <g>
              <defs>
                <g id="minute-hand">
                  <polygon
                    points={cx(
                      `${-30 / 2},${-220}`,
                      `${0},${-240}`,
                      `${30 / 2},${-220}`,
                      `${30 / 2},${0}`,
                      `${-30 / 2},${0}`,
                      `${-30 / 2},${-220}`,

                      `${-25 / 2},${-200}`,
                      `${-25 / 2},${-20}`,
                      `${25 / 2},${-20}`,
                      `${25 / 2},${-200}`,
                      `${-25 / 2},${-200}`
                    )}
                    transform={cx(
                      `rotate(${value / 60}, 250, 250)`,
                      "translate(250, 250)"
                    )}
                  />

                  <circle cx="250" cy="250" r={30 / 2} />
                </g>
              </defs>

              <g
                fill="#e0e0e0"
                stroke="#e0e0e0"
                strokeWidth={5}
                filter="url(#shadow)"
              >
                <use href="#minute-hand" />
              </g>

              <g fill="#c0c0c0" transform={`translate(${5 / 2}, ${5 / 2})`}>
                <use href="#minute-hand" />
              </g>

              <g fill="#ffffff" transform={`translate(${-5 / 2}, ${-5 / 2})`}>
                <use href="#minute-hand" />
              </g>

              <g fill="#e0e0e0">
                <use href="#minute-hand" />
              </g>
            </g>

            <g>
              <defs>
                <g id="second-hand">
                  <polygon
                    points={cx(
                      `${-3 / 2},${-240}`,
                      `${0},${-240}`,
                      `${3 / 2},${-240}`,
                      `${3 / 2},${70}`,
                      `${-3 / 2},${70}`
                    )}
                    transform={cx(
                      `rotate(${value}, 250, 250)`,
                      "translate(250, 250)"
                    )}
                  />

                  <circle cx="250" cy="250" r={20 / 2} />
                </g>
              </defs>

              <g
                fill="#e00000"
                stroke="#e00000"
                strokeWidth={2}
                filter="url(#shadow)"
              >
                <use href="#second-hand" />
              </g>

              <g fill="#c00000" transform={`translate(${2 / 2}, ${2 / 2})`}>
                <use href="#second-hand" />
              </g>

              <g fill="#ff4040" transform={`translate(${-2 / 2}, ${-2 / 2})`}>
                <use href="#second-hand" />
              </g>

              <g fill="#e00000">
                <use href="#second-hand" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
