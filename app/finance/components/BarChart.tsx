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
  const totalPercentage = bars.reduce(
    (total, bar) => (total += bar.percentage),
    0
  );

  const [mouseOverIndex, setMouseOverIndex] = useState<number>();

  function handleMouseOver(index: number) {
    setMouseOverIndex(index);
    onMouseOver?.(index);
  }

  function handleMouseLeave() {
    setMouseOverIndex(undefined);
    onMouseLeave?.();
  }

  return (
    <div
      className={cx(
        "rounded-full",

        "flex",
        "flex-row",
        "overflow-hidden",

        className
      )}
      style={style}
      onMouseLeave={handleMouseLeave}
    >
      {bars.map((bar, index) => (
        <Bar
          key={index}
          color={bar.color}
          percentage={bar.percentage}
          isTransparent={mouseOverIndex != null && index !== mouseOverIndex}
          onMouseOver={() => handleMouseOver(index)}
        />
      ))}

      <Bar
        color={"#00000020"}
        percentage={1 - totalPercentage}
        onMouseOver={handleMouseLeave}
      />
    </div>
  );
}

function Bar({
  color,
  percentage,
  isTransparent,
  onMouseOver,
}: {
  color: string;
  percentage: number;
  isTransparent?: boolean;
  onMouseOver: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={cx("transition-all")}
      style={{
        backgroundColor: color,
        opacity: isTransparent ? 0.25 : 1,
        width: `${percentage * 100}%`,
      }}
      onMouseOver={onMouseOver}
    />
  );
}
