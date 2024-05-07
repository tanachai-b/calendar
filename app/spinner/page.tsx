"use client";

import cx from "classnames";

import { NavBar } from "../components";
import { useEffect, useState } from "react";

export default function SpinnerPage() {
  return (
    <div
      className={cx("h-full", "flex", "flex-col", "bg-black", "select-none")}
    >
      <NavBar className={cx("border-b", "border-highlight_yellow")} />

      <div
        className={cx(
          "grow",
          "bg-[#101010]",
          "flex",
          "items-center",
          "justify-center"
        )}
      >
        {/* <Spinner progress={0.67} size={200} stroke={20} speed={3} /> */}
        <Spinner size={200} stroke={20} speed={3} />
      </div>
    </div>
  );
}

function Spinner({
  progress,
  size = 30,
  stroke = 3,
  speed = 5,
}: {
  progress?: number;
  size?: number;
  stroke?: number;
  speed?: number;
}) {
  const radius = (size - stroke) / 2;

  const isSpinning = progress == null;
  const { angle1: spinAngle1, angle2: spinAngle2 } = useSpinning(
    isSpinning,
    speed
  );

  const angle1 = isSpinning ? spinAngle1 : 0;
  const angle2 = isSpinning ? spinAngle2 : Math.min(progress, 0.9999);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <svg width="100%" height="100%">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#ffffff10"
          strokeWidth={stroke}
        />

        <path
          d={
            `M ${size / 2 + radius * Math.sin(angle1 * 2 * Math.PI)} ` +
            `${size / 2 - radius * Math.cos(angle1 * 2 * Math.PI)} ` +
            `A ${radius} ${radius} ` +
            `0 ${(angle2 + 1 - angle1) % 1 < 0.5 ? 0 : 1} 1 ` +
            `${size / 2 + radius * Math.sin(angle2 * 2 * Math.PI)} ` +
            `${size / 2 - radius * Math.cos(angle2 * 2 * Math.PI)} `
          }
          fill="none"
          stroke="#ffc000"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function useSpinning(isSpinning: boolean, speed: number) {
  const [start, setStart] = useState(Math.random());
  const [distance, setDistance] = useState(Math.random() * 2);

  const [angle1, setAngle1] = useState(0);
  const [angle2, setAngle2] = useState(0);

  useEffect(() => {
    if (!isSpinning) return;

    const interval = setInterval(() => {
      setStart((start) => (start + speed / 360) % 1);
      setDistance((distance) => (distance + speed / 360) % 2);
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isSpinning, speed]);

  useEffect(() => {
    const start1 = Math.floor(start * 10000) / 10000;
    const distance1 = Math.floor(distance * 10000) / 10000;

    setAngle1((distance1 < 1 ? start1 : start1 + distance1) % 1);
    setAngle2((distance1 < 1 ? start1 + distance1 : start1) % 1);
  }, [start, distance]);

  return { angle1, angle2 };
}
