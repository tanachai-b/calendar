export const data: ({
  SortOrder: number;
  Date: string;
  Account: string;
  Change: number;
  Balance: number;
  Notes?: string;
} & (
  | { Direction: "Income" | "Expense"; Category: string }
  | { Direction: "Transfer"; Category?: null }
))[] = [
  {
    SortOrder: 0,
    Date: "2024-02-16",
    Account: "BBL Savings",
    Change: -4500,
    Balance: 5500,
    Direction: "Transfer",
    Category: undefined,
    Notes: "move to own account",
  },
  {
    SortOrder: 1,
    Date: "2024-02-16",
    Account: "BBL Savings",
    Change: 3000,
    Balance: 8500,
    Direction: "Income",
    Category: "Interest",
    Notes: "savings interest",
  },
  {
    SortOrder: 2,
    Date: "2024-02-16",
    Account: "BBL Savings",
    Change: -750,
    Balance: 7750,
    Direction: "Expense",
    Category: "Food",
    Notes: "ordering dinner",
  },
];
