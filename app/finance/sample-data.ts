export type Bank = {
  color: string;
  name: string;
  acronym: string;
};

export const banks: Bank[] = [
  { color: "#0000C0", name: "Bangkok Bank", acronym: "BBL" },
  { color: "#40C0FF", name: "Krungthai Bank", acronym: "KTB" },
  { color: "#FF8040", name: "Government Housing Bank", acronym: "GHB" },
  { color: "#008040", name: "Kasikorn Bank", acronym: "KBank" },
  { color: "#FFC040", name: "Bank of Ayudhaya", acronym: "BAY" },
  { color: "#4000C0", name: "Siam Commercial Bank", acronym: "SCB" },
];

export type Account = {
  bank: string;
  color: string;
  name: string;
  number: string;
  balance: number;
};

export const accounts: Account[] = [
  {
    bank: "Bangkok Bank (BBL)",
    color: "#4040C0",
    name: "BBL Savings",
    number: "123-456-7890",
    balance: 1250,
  },
  {
    bank: "Bangkok Bank (BBL)",
    color: "#0000C0",
    name: "BBL e-Savings",
    number: "123-456-7890",
    balance: 25000,
  },
  {
    bank: "Krungthai Bank (KTB)",
    color: "#80FFFF",
    name: "KTB Savings",
    number: "098-765-4321",
    balance: 500,
  },
  {
    bank: "Government Housing Bank (GHB)",
    color: "#FF8040",
    name: "GHB All Savings",
    number: "024-681-3467",
    balance: 7500,
  },
  {
    bank: "Krungthai Bank (KTB)",
    color: "#40C0FF",
    name: "KTB NEXT Savings",
    number: "098-765-4321",
    balance: 50000,
  },
  {
    bank: "Kasikorn Bank",
    color: "#008040",
    name: "KBank Savings",
    number: "098-765-4321",
    balance: 12500,
  },
];

export type AccountTransaction =
  | {
      date: string;
      type: "Income/Expense";
      account: string;
      amount: number;
      balance: number;
      category: string;
      notes?: string;
    }
  | {
      date: string;
      type: "Internal";
      accountFrom: string;
      accountTo: string;
      amount: number;
      balanceFrom: number;
      balanceTo: number;
      notes: string;
    };

export const accountTransactions: AccountTransaction[] = [
  {
    date: "2024-02-16",
    type: "Income/Expense",
    account: "BBL Savings",
    amount: 3000,
    balance: 8500,
    category: "Interest",
    notes: "savings interest",
  },
  {
    date: "2024-02-16",
    type: "Income/Expense",
    account: "BBL Savings",
    amount: -750,
    balance: 7750,
    category: "Food",
    notes: "ordering dinner",
  },
  {
    date: "2024-02-16",
    type: "Internal",
    accountFrom: "BBL Savings",
    accountTo: "KTB Savings",
    amount: 4500,
    balanceFrom: 5500,
    balanceTo: 5500,
    notes: "move to own account",
  },
];
