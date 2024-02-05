"use client";

import cx from "classnames";
import { CSSProperties, ReactNode, useEffect, useState } from "react";

import { NavBar } from "../components";
import { useClockDrag } from "./useClockDrag";

export default function DigitalClock() {
  const { ref, value, handleMouseDown } = useClockDrag();

  const [time, setTime] = useState<string>("00:00:00");

  useEffect(() => {
    setTime(new Date(value).toTimeString().slice(0, 8));
  }, [value]);

  return (
    <div
      className={cx("h-full", "flex", "flex-col", "bg-black", "select-none")}
    >
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div
        ref={ref}
        className={cx("grow", "flex", "items-center", "justify-center")}
        onMouseDown={handleMouseDown}
      >
        <div
          className={cx("flex", "flex-row", "gap-x10", "items-center")}
          style={{ transform: "scale(0.75)" }}
        >
          <FlipNumber text={time[0]} />
          <FlipNumber text={time[1]} />

          <Colon />

          <FlipNumber text={time[3]} />
          <FlipNumber text={time[4]} />

          <Colon />

          <FlipNumber text={time[6]} />
          <FlipNumber text={time[7]} />
        </div>
      </div>
    </div>
  );
}

function Colon() {
  return (
    <div
      className={cx("w-x50", "flex", "flex-col", "gap-x100", "items-center")}
    >
      <div className={cx("size-x30", "bg-[#e0e0e0]")} />
      <div className={cx("size-x30", "bg-[#e0e0e0]")} />
    </div>
  );
}

function FlipNumber({ style, text }: { style?: CSSProperties; text: string }) {
  const size = {
    width: style?.width ?? "200px",
    height: style?.height ?? "300px",
  };

  const [currentText, setCurrentText] = useState<string>("0");
  const [nextText, setNextText] = useState<string>();
  const [queueText, setQueueText] = useState<string>();

  const [turn, setTurn] = useState<number>(0);

  useEffect(() => {
    setQueueText(text);
  }, [text]);

  useEffect(() => {
    if (turn !== 0) return;
    if (queueText == null) return;
    if (nextText == null) {
      setQueueText(undefined);
      setNextText(queueText);
    }
  }, [queueText]);

  useEffect(() => {
    if (turn !== 0) return;
    if (nextText == null) return;
    // if (nextText == null && queueText == null) return;
    // if (nextText == null && queueText != null) {
    //   setNextText(queueText);
    //   setQueueText(undefined);
    //   return;
    // }

    const timer = setInterval(
      () =>
        setTurn((value) => {
          const newValue = value + 0.1;
          if (newValue < 1) return newValue;

          clearInterval(timer);
          setCurrentText(nextText);
          setNextText(queueText);
          setQueueText(undefined);
          return 0;
        }),
      1000 / 60
    );
    return () => clearInterval(timer);
  }, [nextText]);

  const topFlapAngle = turn >= 0 && turn <= 0.5 ? turn * -180 : -90;
  const bottomFlapAngle = turn >= 0.5 && turn <= 1 ? turn * -180 - 180 : -270;

  return (
    <div>
      <div
        className={cx("size-fit")}
        style={{
          perspective: "700px",
          perspectiveOrigin: "50% 50%",
          ...style,
          ...size,
        }}
      >
        <div className={cx("absolute", "w-[100%]", "h-[100%]")}>
          <Flap className={cx("top-x0", "rounded-t-x15")}>
            <Label className={cx("top-x0")} style={size}>
              {nextText}
            </Label>
          </Flap>
        </div>

        <div className={cx("absolute", "w-[100%]", "h-[100%]")}>
          <Flap className={cx("bottom-x0", "rounded-b-x15")}>
            <Label className={cx("bottom-x0")} style={size}>
              {currentText}
            </Label>
          </Flap>
        </div>

        <div
          className={cx("absolute", "w-[100%]", "h-[100%]")}
          style={{
            transform: `rotate3d(1, 0, 0, ${topFlapAngle}deg)`,
          }}
        >
          <Flap className={cx("top-x0", "rounded-t-x15")}>
            <Label className={cx("top-x0")} style={size}>
              {currentText}
            </Label>
          </Flap>
        </div>

        <div
          className={cx("absolute", "w-[100%]", "h-[100%]")}
          style={{
            transform: `rotate3d(1, 0, 0, ${bottomFlapAngle}deg)`,
          }}
        >
          <Flap className={cx("bottom-x0", "rounded-b-x15")}>
            <Label className={cx("bottom-x0")} style={size}>
              {nextText}
            </Label>
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
        "h-[calc(50%-5px)]",

        "bg-[#101010]",

        "border",
        "border-[#202020]",
        "border-x2",

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
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "absolute",

        "flex",
        "items-center",
        "justify-center",

        "text-[#e0e0e0]",
        "text-[320px]",
        "font-medium",

        className
      )}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}
