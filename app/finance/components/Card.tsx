import cx from "classnames";
import { HTMLAttributes } from "react";

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cx(
        "rounded-x10",
        "bg-[#ffffff]",
        "shadow-x10",

        props.className
      )}
    />
  );
}
