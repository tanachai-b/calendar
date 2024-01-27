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
            <defs>
              <filter id="shadow1">
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

              <radialGradient id="radial1">
                <stop offset="0%" stopColor="#404040" />
                <stop offset="100%" stopColor="#101010" />
              </radialGradient>
            </defs>

            <circle
              cx="250"
              cy="250"
              r="250"
              fill="#101010"
              // fill="url(#radial1)"
            />

            {/* <foreignObject x="0" y="0" width="500" height="500">
              <div
                className={cx("size-full", "bg-text_red", "rounded-full")}
                style={{
                  background: `conic-gradient(#000000,#404040,#000000,#404040,#000000)`,
                }}
              />
            </foreignObject> */}

            <g fill="#808080">
              <circle
                cx={250}
                cy={250}
                r={250 - 2 / 2}
                fill="none"
                stroke="#808080"
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
                  alignmentBaseline="central"
                  className={cx("text-x70", "font-semibold")}
                >
                  {(i + 1) % 12 === 0 ? i + 1 : ""}
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
                fill="#ffc000"
                stroke="#ffc000"
                strokeWidth={2}
                filter="url(#shadow2)"
              >
                <use href="#hatch-marks" />
              </g>

              <g fill="#805000" transform={`translate(${2 / 2}, ${2 / 2})`}>
                <use href="#hatch-marks" />
              </g>

              <g fill="#fff080" transform={`translate(${-2 / 2}, ${-2 / 2})`}>
                <use href="#hatch-marks" />
              </g>

              <g fill="#ffc000">
                <use href="#hatch-marks" />
              </g>
            </g>

            <g fill="#808080" transform={cx("translate(250.5, 160.5)")}>
              <rect
                x={-60 / 2}
                y={-40 / 2}
                width={60}
                height={40}
                fill="none"
                stroke="#808080"
                strokeWidth="3"
              />

              <text
                textAnchor="middle"
                alignmentBaseline="central"
                className={cx("text-x30", "font-semibold")}
              >
                {new Date().getDate()}
              </text>
            </g>

            <g stroke="#808080" strokeWidth={3}>
              <path
                id="textpath"
                fill="none"
                stroke="none"
                d="M -65 0 A 65 65 0 0 1 65 0"
              />

              <path
                id="textpath-reverse"
                fill="none"
                stroke="none"
                d="M 65 0 A 65 65 0 0 0 -65 0"
              />

              <g transform={`translate(${250 - 125}, ${250})`}>
                <circle cx={0} cy={0} r={80} fill="none" />
                {/* <circle cx={0} cy={0} r={80 - 30} fill="none" /> */}

                {Array.from({ length: 12 }).map((v, i) => (
                  <line
                    key={i}
                    x1={0}
                    y1={-80}
                    x2={0}
                    y2={-80 + 30}
                    strokeWidth={i % 3 === 0 ? 7 : ""}
                    transform={`rotate(${(i / 12) * 360}, 0, 0)`}
                  />
                ))}

                {[
                  "♑",
                  "♒",
                  "♓",
                  "♈",
                  "♉",
                  "♊",
                  "♋",
                  "♌",
                  "♍",
                  "♎",
                  "♏",
                  "♐",
                ].map((v, i) => {
                  const flip = i >= 3 && i <= 8;
                  return (
                    <text
                      key={i}
                      transform={`rotate(${(-(i + 0.5) / 12) * 360})`}
                    >
                      <textPath
                        strokeWidth={0}
                        fill={i === 0 ? "#808080" : "#808080"}
                        className={cx("text-x20", "font-bold")}
                        textAnchor={"middle"}
                        startOffset="50%"
                        alignmentBaseline={"central"}
                        href={flip ? "#textpath-reverse" : "#textpath"}
                      >
                        {i + 1}
                        {/* {v + "\uFE0E"} */}
                      </textPath>
                    </text>
                  );
                })}

                <g
                  fill="#ffc000"
                  stroke="none"
                  transform={`rotate(${
                    -(
                      (new Date().getMonth() +
                        (new Date().getDate() - 1) /
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() + 1,
                            0
                          ).getDate()) /
                      12
                    ) * 360
                  })`}
                  filter="url(#shadow1)"
                >
                  <polygon
                    points={cx(
                      `${-15 / 2},${-45}`,
                      `${0},${-55}`,
                      `${15 / 2},${-45}`,
                      `${30 / 2},${0}`,
                      `${-30 / 2},${0}`,
                      `${-15 / 2},${-45}`
                    )}
                  />

                  <circle r={30 / 2} />
                </g>
              </g>

              <g transform={`translate(${250}, ${250 + 125})`}>
                <circle cx={0} cy={0} r={80} fill="none" />
                {/* <circle cx={0} cy={0} r={80 - 30} fill="none" /> */}

                {Array.from({ length: 8 }).map((v, i) => (
                  <line
                    key={i}
                    x1={0}
                    y1={-80}
                    x2={0}
                    y2={-80 + 30}
                    transform={`rotate(${((i + 0.5) / 8) * 360}, 0, 0)`}
                  />
                ))}

                {[
                  "\uD83C\uDF15",
                  "\uD83C\uDF16",
                  "\uD83C\uDF17",
                  "\uD83C\uDF18",
                  "\uD83C\uDF11",
                  "\uD83C\uDF12",
                  "\uD83C\uDF13",
                  "\uD83C\uDF14",
                ].map((v, i) => (
                  <text key={i} transform={`rotate(${(-i / 8) * 360})`}>
                    <textPath
                      strokeWidth={0}
                      fill={i === 0 ? "#808080" : "#808080"}
                      className={cx("text-x20", "font-bold")}
                      textAnchor={"middle"}
                      startOffset="50%"
                      alignmentBaseline={"central"}
                      href={"#textpath"}
                    >
                      {/* {i + 1} */}
                      {v + "\uFE0E"}
                    </textPath>
                  </text>
                ))}

                <g
                  fill="#ffc000"
                  stroke="none"
                  transform={`rotate(${
                    -(
                      (new Date() - new Date(2024, 0, 11, 18, 57)) /
                      1000 /
                      60 /
                      60 /
                      24 /
                      29.53059
                    ) * 360
                  })`}
                  filter="url(#shadow1)"
                >
                  <polygon
                    points={cx(
                      `${-15 / 2},${-45}`,
                      `${0},${-55}`,
                      `${15 / 2},${-45}`,
                      `${30 / 2},${0}`,
                      `${-30 / 2},${0}`,
                      `${-15 / 2},${-45}`
                    )}
                  />

                  <circle r={30 / 2} />
                </g>
              </g>

              <g transform={`translate(${250 + 125}, ${250})`}>
                <circle cx={0} cy={0} r={80} fill="none" />
                {/* <circle cx={0} cy={0} r={80 - 30} fill="none" /> */}

                {Array.from({ length: 7 }).map((v, i) => (
                  <line
                    key={i}
                    x1={0}
                    y1={-80}
                    x2={0}
                    y2={-80 + 30}
                    strokeWidth={i % 7 === 0 ? 7 : ""}
                    transform={`rotate(${(i / 7) * 360}, 0, 0)`}
                  />
                ))}

                {["S", "M", "T", "W", "T", "F", "S"].map((v, i) => {
                  const flip = i >= 2 && i <= 4;
                  return (
                    <text
                      key={i}
                      transform={`rotate(${(-(i + 0.5) / 7) * 360})`}
                    >
                      <textPath
                        strokeWidth={0}
                        fill={i === 0 ? "#808080" : "#808080"}
                        className={cx("text-x20", "font-bold")}
                        textAnchor={"middle"}
                        startOffset="50%"
                        alignmentBaseline={"central"}
                        href={flip ? "#textpath-reverse" : "#textpath"}
                      >
                        {v}
                      </textPath>
                    </text>
                  );
                })}

                <g
                  fill="#ffc000"
                  stroke="none"
                  transform={`rotate(${
                    -((new Date().getDay() + value / 360 / 60 / 24) / 7) * 360
                  })`}
                  filter="url(#shadow1)"
                >
                  <polygon
                    points={cx(
                      `${-15 / 2},${-45}`,
                      `${0},${-55}`,
                      `${15 / 2},${-45}`,
                      `${30 / 2},${0}`,
                      `${-30 / 2},${0}`,
                      `${-15 / 2},${-45}`
                    )}
                  />

                  <circle r={30 / 2} />
                </g>
              </g>
            </g>

            <g>
              <defs>
                <g id="hour-hand">
                  <polygon
                    points={cx(
                      `${-30 / 2},${-140}`,
                      `${0},${-150}`,
                      `${30 / 2},${-140}`,
                      `${50 / 2},${0}`,
                      `${-50 / 2},${0}`,
                      `${-30 / 2},${-140}`,

                      `${-20 / 2},${-110}`,
                      `${-30 / 2},${-30}`,
                      `${30 / 2},${-30}`,
                      `${20 / 2},${-110}`,
                      `${-20 / 2},${-110}`
                    )}
                    transform={cx(
                      `rotate(${value / 60 / 12}, 250, 250)`,
                      "translate(250, 250)"
                    )}
                  />
                </g>
              </defs>

              <g
                fill="#808080"
                stroke="#808080"
                strokeWidth={2}
                filter="url(#shadow1)"
              >
                <use href="#hour-hand" />
              </g>

              <g fill="#404040" transform={`translate(${2 / 2}, ${2 / 2})`}>
                <use href="#hour-hand" />
              </g>

              <g fill="#c0c0c0" transform={`translate(${-2 / 2}, ${-2 / 2})`}>
                <use href="#hour-hand" />
              </g>

              <g fill="#808080">
                <use href="#hour-hand" />
              </g>

              <polygon
                points={cx(
                  `${-27 / 2},${-140}`,
                  `${0},${-149}`,
                  `${27 / 2},${-140}`,
                  `${30 / 2},${-120}`,
                  `${-30 / 2},${-120}`,
                  `${-27 / 2},${-140}`
                )}
                transform={cx(
                  `rotate(${value / 60 / 12}, 250, 250)`,
                  "translate(250, 250)"
                )}
                fill="#ffc000"
              />
            </g>

            <g>
              <defs>
                <g id="minute-hand">
                  <polygon
                    points={cx(
                      `${-30 / 2},${-230}`,
                      `${0},${-240}`,
                      `${30 / 2},${-230}`,
                      `${50 / 2},${0}`,
                      `${-50 / 2},${0}`,
                      `${-30 / 2},${-230}`,

                      `${-20 / 2},${-200}`,
                      `${-30 / 2},${-30}`,
                      `${30 / 2},${-30}`,
                      `${20 / 2},${-200}`,
                      `${-20 / 2},${-200}`
                    )}
                    transform={cx(
                      `rotate(${value / 60}, 250, 250)`,
                      "translate(250, 250)"
                    )}
                  />

                  <circle cx="250" cy="250" r={50 / 2} />
                </g>
              </defs>

              <g
                fill="#808080"
                stroke="#808080"
                strokeWidth={2}
                filter="url(#shadow1)"
              >
                <use href="#minute-hand" />
              </g>

              <g fill="#404040" transform={`translate(${2 / 2}, ${2 / 2})`}>
                <use href="#minute-hand" />
              </g>

              <g fill="#c0c0c0" transform={`translate(${-2 / 2}, ${-2 / 2})`}>
                <use href="#minute-hand" />
              </g>

              <g fill="#808080">
                <use href="#minute-hand" />
              </g>

              <polygon
                points={cx(
                  `${-27 / 2},${-230}`,
                  `${0},${-240}`,
                  `${27 / 2},${-230}`,
                  `${30 / 2},${-210}`,
                  `${-30 / 2},${-210}`,
                  `${-27 / 2},${-230}`
                )}
                transform={cx(
                  `rotate(${value / 60}, 250, 250)`,
                  "translate(250, 250)"
                )}
                fill="#ffc000"
              />
            </g>

            <g>
              <defs>
                <g id="second-hand">
                  <polygon
                    points={cx(
                      `${-0 / 2},${-240}`,
                      `${0},${-240}`,
                      `${0 / 2},${-240}`,
                      `${15 / 2},${70}`,
                      `${-15 / 2},${70}`
                    )}
                    transform={cx(
                      `rotate(${value}, 250, 250)`,
                      "translate(250, 250)"
                    )}
                  />

                  <circle cx="250" cy="250" r={30 / 2} />
                </g>
              </defs>

              <g
                fill="#ffc000"
                stroke="#ffc000"
                strokeWidth={2}
                filter="url(#shadow1)"
              >
                <use href="#second-hand" />
              </g>

              <g fill="#805000" transform={`translate(${2 / 2}, ${2 / 2})`}>
                <use href="#second-hand" />
              </g>

              <g fill="#fff080" transform={`translate(${-2 / 2}, ${-2 / 2})`}>
                <use href="#second-hand" />
              </g>

              <g fill="#ffc000">
                <use href="#second-hand" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
