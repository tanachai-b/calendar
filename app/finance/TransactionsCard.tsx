import cx from "classnames";
import { HTMLAttributes } from "react";

import { Card } from "./components/Card";
import { transactions } from "./sample-data";

export function TransactionsCard() {
  return (
    <Card className={cx("w-x500")}>
      <div className={cx("p-x10", "pb-x0", "text-x20", "font-light")}>
        Transactions
      </div>

      <div className={cx()}>
        {transactions.map((transaction, index) => {
          if (transaction.type === "Income/Expense") {
            return (
              <IncomeExpenseRow
                key={index}
                {...transaction}
                {...transaction.incomeExpense}
              />
            );
          } else {
            return (
              <InternalMovementRow
                key={index}
                {...transaction}
                {...transaction.internalMovement}
              />
            );
          }
        })}
      </div>
    </Card>
  );
}

function IncomeExpenseRow({
  type,
  date,
  account,
  amount,
  balance,
  category,
  notes,
}: {
  type: "Income/Expense";
  date: string;
  account: string;
  amount: number;
  balance: number;
  category: string;
  notes: string;
}) {
  return (
    <div
      className={cx(
        "p-x20",
        "grid",
        "grid-cols-[repeat(3,minmax(0,1fr))]",
        "gap-x-x10",
        "gap-y-x10"
      )}
    >
      <LabelValue label="Date" value={date} />
      <LabelValue label="Type" value={type} />
      <LabelValue label="Category" value={category} />
      <LabelValue label="Account" value={account} />
      <LabelValue label="Amount" value={amount} />
      <LabelValue label="Balance" value={balance} />
      <LabelValue label="Notes" value={notes} />
    </div>
  );
}

function InternalMovementRow({
  type,
  date,
  accountFrom,
  accountTo,
  amount,
  balanceFrom,
  balanceTo,
  notes,
}: {
  type: "Internal Movement";
  date: string;
  accountFrom: string;
  accountTo: string;
  amount: number;
  balanceFrom: number;
  balanceTo: number;
  notes: string;
}) {
  return (
    <div
      className={cx(
        "p-x20",
        "grid",
        "grid-cols-[repeat(3,minmax(0,1fr))]",
        "gap-x-x10",
        "gap-y-x10"
      )}
    >
      <LabelValue label="Date" value={date} />
      <LabelValue label="Type" value={type} />
      <div />
      <LabelValue label="Account From" value={accountFrom} />
      <LabelValue label="Amount" value={amount} />
      <LabelValue label="Balance From" value={balanceFrom} />
      <LabelValue label="Account To" value={accountTo} />
      <div />
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
        className={cx("text-[#00000080]", "overflow-hidden", "text-ellipsis")}
      >
        {label}
      </div>
      <div className={cx("font-medium", "overflow-hidden", "text-ellipsis")}>
        {formattedValue}
      </div>
    </div>
  );
}
