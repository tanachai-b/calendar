import cx from "classnames";
import { CSSProperties, ReactNode } from "react";

export function Card({
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
      className={cx("rounded-x10", "bg-[#ffffff]", "shadow-x10", className)}
      style={style}
    >
      {children}
    </div>
  );
}
