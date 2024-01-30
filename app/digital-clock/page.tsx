"use client";

import cx from "classnames";
import { ReactNode, useEffect, useState } from "react";

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
        style={{
          perspective: "500px",
          perspectiveOrigin: "75px 100px",
        }}
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
            <Label className="top-x0">5</Label>
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
            <Label className="bottom-x0">4</Label>
          </div>
        </div>

        <div
          className={cx(
            "absolute",
            "w-[100%]",
            "h-[calc(50%-1px)]",
            "top-x0",

            "bg-black-light",
            "rounded-t-x20",

            "border",
            "border-grey-dark",

            "overflow-hidden"
          )}
          style={{
            transform: `rotate3d(1, 0, 0, ${
              value <= 0 && value > -90 ? value : 90
            }deg)`,
            transformOrigin: "75px 100px",
          }}
        >
          <Label className="top-x0">4</Label>
        </div>

        <div
          className={cx("absolute", "w-[150px]", "h-[200px]", "rounded-x20")}
          style={{
            transform: `rotate3d(1, 0, 0, ${
              value <= -90 && value > -180 ? value - 180 : 90
            }deg)`,
          }}
        >
          <div
            className={cx(
              "absolute",
              "w-[100%]",
              "h-[calc(50%-1px)]",
              "bottom-x0",

              "bg-black-light",
              "rounded-b-x20",

              "border",
              "border-grey-dark",

              "overflow-hidden"
            )}
          >
            <Label className="bottom-x0">5</Label>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "absolute",
        "w-[100%]",
        "h-[200%]",

        "flex",
        "items-center",
        "justify-center",

        "text-white-dark",
        "text-[200px]",
        "font-semibold",

        className
      )}
    >
      {children}
    </div>
  );
}
