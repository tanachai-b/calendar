import cx from "classnames";

import { Card } from "./components/Card";
import { banks } from "./sample-data";

export function BanksCard() {
  return (
    <Card className={cx("size-fit", "flex", "flex-col")}>
      <div className={cx("p-x10", "pb-x0", "text-x20", "font-light")}>
        Banks
      </div>

      <div className={cx("flex", "flex-col", "p-x20", "gap-x10")}>
        {banks.map((bankColor, index) => (
          <BanksCardRow
            key={index}
            color={bankColor.color}
            name={bankColor.name}
            acronym={bankColor.acronym}
          />
        ))}
      </div>
    </Card>
  );

  function BanksCardRow({
    color,
    name,
    acronym,
  }: {
    color: string;
    name: string;
    acronym: string;
  }) {
    return (
      <div className={cx("flex", "flex-row", "items-center", "gap-x5")}>
        <div
          className={cx("rounded-full", "size-x15")}
          style={{ backgroundColor: color }}
        />

        <div>
          {name} <span className={cx("text-[#00000080]")}>({acronym})</span>
        </div>
      </div>
    );
  }
}
