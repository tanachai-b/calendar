import cx from "classnames";
import { HTMLAttributes } from "react";

import { Card } from "./components/Card";
import { transactions } from "./sample-data";

export function TransactionsCard(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      {...props}
      className={cx("w-x500", "flex", "flex-col", props.className)}
    >
      <div className={cx("p-x10", "pb-x0", "text-x20", "font-light")}>
        Transactions
      </div>

      <div className={cx("overflow-auto", "dark-scroll-bar")}>
        <div>
          {transactions.map((transaction, index) => {
            if (transaction.type === "Income/Expense") {
              return <IncomeExpenseRow key={index} {...transaction} />;
            } else {
              return <InternalMovementRow key={index} {...transaction} />;
            }
          })}
        </div>
      </div>
    </Card>
  );
}

function IncomeExpenseRow({
  date,
  type,
  category,
  amount,
  account,
  balance,
  notes,
}: {
  date: string;
  type: "Income/Expense";
  category: string;
  amount: number;
  account: string;
  balance: number;
  notes: string;
}) {
  return (
    <div
      className={cx(
        "p-x20",
        "grid",
        "grid-cols-[repeat(2,minmax(0,1fr))]",
        "gap-x-x10",
        "gap-y-x10"
      )}
    >
      <LabelValue label="Date" value={date} />
      <div />
      <LabelValue label="Type" value={type} />
      <LabelValue label="Category" value={category} />
      <LabelValue label="Account" value={account} />
      <LabelValue label="Amount" value={amount} />
      <div />
      <LabelValue label="Balance" value={balance} />
      <LabelValue label="Notes" value={notes} />
    </div>
  );
}

function InternalMovementRow({
  date,
  type,
  amount,
  accountFrom,
  accountTo,
  balanceFrom,
  balanceTo,
  notes,
}: {
  type: "Transfer";
  date: string;
  amount: number;
  accountFrom: string;
  accountTo: string;
  balanceFrom: number;
  balanceTo: number;
  notes: string;
}) {
  return (
    <div
      className={cx(
        "p-x20",
        "grid",
        "grid-cols-[repeat(2,minmax(0,1fr))]",
        "gap-x-x10",
        "gap-y-x10"
      )}
    >
      <LabelValue label="Date" value={date} />
      <div />
      <LabelValue label="Type" value={type} />
      <LabelValue label="Amount" value={amount} />
      <LabelValue label="Account From" value={accountFrom} />
      <LabelValue label="Balance From" value={balanceFrom} />
      <LabelValue label="Account To" value={accountTo} />
      <LabelValue label="Balance To" value={balanceTo} />
      <LabelValue label="Notes" value={notes} />
    </div>
  );
}

function LabelValue({
  label,
  value,
  ...props
}: {
  label: string;
  value: string | number;
} & HTMLAttributes<HTMLDivElement>) {
  const valueIsString = typeof value === "string";
  const formattedValue = valueIsString
    ? value
    : value.toLocaleString(undefined, { minimumFractionDigits: 2 });

  return (
    <div {...props} className={cx("flex", "flex-col", props.className)}>
      <div
        className={cx(
          "text-x10",
          "font-semibold",
          "text-[#00000080]",

          "overflow-hidden",
          "text-ellipsis"
        )}
      >
        {label}
      </div>

      <div className={cx("overflow-hidden", "text-ellipsis")}>
        {formattedValue}
      </div>
    </div>
  );
}
