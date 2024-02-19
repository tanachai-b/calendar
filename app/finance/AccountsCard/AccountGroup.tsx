import cx from "classnames";
import { ReactNode } from "react";

export function AccountGroup({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div
        className={cx(
          "flex",
          "flex-row",

          "gap-x10",
          "items-center",

          "text-[#00000080]"
        )}
      >
        {name}
      </div>

      <div className={cx("flex", "flex-col", "p-x10", "gap-x10")}>
        {children}
      </div>
    </div>
  );
}
