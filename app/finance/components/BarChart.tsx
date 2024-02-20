import cx from "classnames";
import { CSSProperties, MouseEventHandler, useState } from "react";

export function BarChart({
  className,
  style,
  bars,
  onMouseOver,
  onMouseLeave,
}: {
  className?: string;
  style?: CSSProperties;
  bars: { color: string; percentage: number }[];
  onMouseOver?: (index: number) => void;
  onMouseLeave?: () => void;
}) {
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
          percentage={bar.percentage}
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
