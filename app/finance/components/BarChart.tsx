import cx from "classnames";
import { CSSProperties, MouseEventHandler, useState } from "react";

export function BarChart({
  className,
  style,
  bars,
  maxValue: inputMax,
  onMouseOver,
  onMouseLeave,
}: {
  className?: string;
  style?: CSSProperties;
  bars: { color: string; value: number }[];
  maxValue?: number;
  onMouseOver?: (index: number) => void;
  onMouseLeave?: () => void;
}) {
  const maxValue =
    inputMax ?? bars.reduce((total, bar) => total + bar.value, 0);

  return (
    <div
      className={cx(
        "rounded-full",
        "bg-[#00000020]",

        "flex",
        "flex-row",
        "overflow-hidden",

        className
      )}
      style={style}
      onMouseOver={onMouseLeave}
      onMouseLeave={onMouseLeave}
    >
      {bars.map((bar, index) => (
        <Bar
          key={index}
          color={bar.color}
          percentage={bar.value / maxValue}
          onMouseOver={
            onMouseOver
              ? (event) => {
                  onMouseOver?.(index);
                  event.stopPropagation();
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}

function Bar({
  color,
  percentage,
  onMouseOver,
}: {
  color: string;
  percentage: number;
  onMouseOver?: MouseEventHandler<HTMLDivElement>;
}) {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  return (
    <div
      style={{ backgroundColor: color, width: `${percentage * 100}%` }}
      onMouseOver={
        onMouseOver
          ? (event) => {
              setIsMouseOver(true);
              onMouseOver?.(event);
            }
          : undefined
      }
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div
        className={cx("size-full", "bg-[#ffffff40]")}
        style={{ visibility: isMouseOver ? "visible" : "hidden" }}
      />
    </div>
  );
}
