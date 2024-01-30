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
    <div style={{ transform: "scale(1)" }}>
      <div
        className={cx("size-fit", "w-[200px]", "h-[250px]")}
        style={{
          perspective: "700px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div className={cx("absolute", "w-[100%]", "h-[100%]")}>
          <Flap className={cx("top-x0", "rounded-t-x15")}>
            <Label className="top-x0">5</Label>
          </Flap>
        </div>

        <div className={cx("absolute", "w-[100%]", "h-[100%]")}>
          <Flap className={cx("bottom-x0", "rounded-b-x15")}>
            <Label className="bottom-x0">4</Label>
          </Flap>
        </div>

        <div
          className={cx("absolute", "w-[100%]", "h-[100%]")}
          style={{
            transform: `rotate3d(1, 0, 0, ${
              value <= 0 && value > -90 ? value : 90
            }deg)`,
          }}
        >
          <Flap className={cx("top-x0", "rounded-t-x15")}>
            <Label className="top-x0">4</Label>
          </Flap>
        </div>

        <div
          className={cx("absolute", "w-[100%]", "h-[100%]")}
          style={{
            transform: `rotate3d(1, 0, 0, ${
              value <= -90 && value > -180 ? value - 180 : 90
            }deg)`,
          }}
        >
          <Flap className={cx("bottom-x0", "rounded-b-x15")}>
            <Label className="bottom-x0">5</Label>
          </Flap>
        </div>
      </div>
    </div>
  );
}

function Flap({
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
        "h-[calc(50%-2px)]",

        "bg-[#101010]",

        "border",
        "border-[#202020]",

        "overflow-hidden",

        className
      )}
    >
      {children}
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

        "text-[#e0e0e0]",
        "text-[270px]",
        "font-semibold",

        className
      )}
    >
      {children}
    </div>
  );
}
