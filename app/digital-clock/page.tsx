"use client";

import cx from "classnames";
import { useEffect, useState } from "react";

import { NavBar } from "../components";

export default function DigitalClock() {
  return (
    <div
      className={cx("h-full", "flex", "flex-col", "bg-black", "select-none")}
    >
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div className={cx("grow", "flex", "items-center", "justify-center")}>
        <FlipNumber />
      </div>
    </div>
  );
}

function FlipNumber() {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(
        (((((new Date().getTime() / 1000) * -360) % 360) - 360) % 360) / 2
      );
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ transform: "scale(1.5)" }}>
      <div
        className={cx("size-fit", "w-[150px]", "h-[200px]")}
        style={{ perspective: "500px" }}
      >
        <div
          className={cx("absolute", "w-[150px]", "h-[200px]", "rounded-x20")}
        >
          <div
            className={cx(
              "absolute",
              "w-[150px]",
              "h-[99px]",
              "top-x0",

              "bg-black-light",
              "rounded-t-x20",

              "border",
              "border-grey-dark",

              "overflow-hidden"
            )}
          >
            <div
              className={cx(
                "absolute",
                "w-[150px]",
                "h-[200px]",
                "top-x0",

                "flex",
                "items-center",
                "justify-center",

                "text-white-dark",
                "text-[200px]",
                "font-semibold"
              )}
            >
              5
            </div>
          </div>
        </div>

        <div
          className={cx("absolute", "w-[150px]", "h-[200px]", "rounded-x20")}
        >
          <div
            className={cx(
              "absolute",
              "w-[150px]",
              "h-[99px]",
              "bottom-x0",

              "bg-black-light",
              "rounded-b-x20",

              "border",
              "border-grey-dark",

              "overflow-hidden"
            )}
          >
            <div
              className={cx(
                "absolute",
                "w-[150px]",
                "h-[200px]",
                "bottom-x0",

                "flex",
                "items-center",
                "justify-center",

                "text-white-dark",
                "text-[200px]",
                "font-semibold"
              )}
            >
              4
            </div>
          </div>
        </div>

        <div
          className={cx("absolute", "w-[150px]", "h-[200px]", "rounded-x20")}
          style={{
            transform: `rotate3d(1, 0, 0, ${
              value <= -90 && value > -180 ? value - 180 : 0
            }deg)`,
            zIndex: value <= -90 ? 100 : -100,
          }}
        >
          <div
            className={cx(
              "absolute",
              "w-[150px]",
              "h-[99px]",
              "bottom-x0",

              "bg-black-light",
              "rounded-b-x20",

              "border",
              "border-grey-dark",

              "overflow-hidden"
            )}
          >
            <div
              className={cx(
                "absolute",
                "w-[150px]",
                "h-[200px]",
                "bottom-x0",

                "flex",
                "items-center",
                "justify-center",

                "text-white-dark",
                "text-[200px]",
                "font-semibold"
              )}
            >
              5
            </div>
          </div>
        </div>

        <div
          className={cx("absolute", "w-[150px]", "h-[200px]", "rounded-x20")}
          style={{
            transform: `rotate3d(1, 0, 0, ${
              value <= 0 && value > -90 ? value : 90
            }deg)`,
          }}
        >
          <div
            className={cx(
              "absolute",
              "w-[150px]",
              "h-[99px]",
              "top-x0",

              "bg-black-light",
              "rounded-t-x20",

              "border",
              "border-grey-dark",

              "overflow-hidden"
            )}
          >
            <div
              className={cx(
                "absolute",
                "w-[150px]",
                "h-[200px]",
                "top-x0",

                "flex",
                "items-center",
                "justify-center",

                "text-white-dark",
                "text-[200px]",
                "font-semibold"
              )}
            >
              4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
