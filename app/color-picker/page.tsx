"use client";

import cx from "classnames";

import { NavBar } from "../components";

export default function ColorPickerPage() {
  return (
    <div
      className={cx("h-full", "flex", "flex-col", "bg-black", "select-none")}
    >
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div
        className={cx(
          "grow",
          "bg-black-light",
          "flex",
          "items-center",
          "justify-center"
        )}
      >
        <div
          className={cx(
            "w-x300",
            "h-[60px]",
            "rounded-x10",
            "overflow-hidden",
            "bg-black-light",
            "border-x1",
            "border-grey-dark"
          )}
        >
          <svg width="100%" height="100%">
            {/* <rect width="100%" height="100%" fill="#ffffff10" /> */}

            <g>
              <g stroke="#ffffff40" strokeWidth="1" strokeLinecap="round">
                {Array.from({ length: 8 + 1 }).map((v, i) => {
                  return (
                    <line
                      key={i}
                      x1={((i + 0.5) / (8 + 1)) * 300}
                      y1={5}
                      x2={((i + 0.5) / (8 + 1)) * 300}
                      y2={40}
                    />
                  );
                })}

                {Array.from({ length: 8 }).map((v, i) => {
                  return (
                    <line
                      key={i}
                      x1={((i + 1) / (8 + 1)) * 300}
                      y1={5}
                      x2={((i + 1) / (8 + 1)) * 300}
                      y2={27}
                    />
                  );
                })}

                {Array.from({ length: 8 * 2 }).map((v, i) => {
                  return (
                    <line
                      key={i}
                      x1={((i / 2 + 0.75) / (8 + 1)) * 300}
                      y1={5}
                      x2={((i / 2 + 0.75) / (8 + 1)) * 300}
                      y2={15}
                    />
                  );
                })}
              </g>

              <g fill="#ffffff40">
                {Array.from({ length: 8 + 1 }).map((v, i) => {
                  return (
                    <text
                      key={i}
                      x={((i + 0.5) / (8 + 1)) * 300}
                      y={60 - 5}
                      alignmentBaseline="after-edge"
                      textAnchor="middle"
                      fontSize="12px"
                    >
                      {Math.min((i / 8) * 256, 255)
                        .toString(16)
                        .toUpperCase()}
                    </text>
                  );
                })}

                {Array.from({ length: 8 }).map((v, i) => {
                  return (
                    <text
                      key={i}
                      x={((i + 1) / (8 + 1)) * 300}
                      y={60 - 20}
                      alignmentBaseline="after-edge"
                      textAnchor="middle"
                      fontSize="10px"
                    >
                      {Math.min(((i + 0.5) / 8) * 256, 255)
                        .toString(16)
                        .toUpperCase()}
                    </text>
                  );
                })}

                {Array.from({ length: 8 * 2 }).map((v, i) => {
                  return (
                    <text
                      key={i}
                      x={((i / 2 + 0.75) / (8 + 1)) * 300}
                      y={60 - 35}
                      alignmentBaseline="after-edge"
                      textAnchor="middle"
                      fontSize="8px"
                    >
                      {Math.min(((i / 2 + 0.25) / 8) * 256, 255)
                        .toString(16)
                        .toUpperCase()}
                    </text>
                  );
                })}
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
