import { AccountsCard } from "./AccountsCard/AccountsCard";

export const accounts: Parameters<typeof AccountsCard>[0]["accounts"] = [
  {
    bank: "Bangkok Bank",
    color: "#0000c0",
    name: "BBL e-Savings",
    number: "890-0-169434",
    balance: 1000000,
  },
  {
    bank: "Bangkok Bank",
    color: "#4040c0",
    name: "BBL Savings",
    number: "640-0-943872",
    balance: 19615.27,
  },
  {
    bank: "GHB",
    color: "#ff8040",
    name: "GHB Golden Dragon",
    number: "440-19-810019-6",
    balance: 1000000,
  },
  {
    bank: "GHB",
    color: "#ffc080",
    name: "GHB All Savings",
    number: "100-19-510895-7",
    balance: 990000,
  },
  {
    bank: "GHB",
    color: "#c08040",
    name: "GHB High Savings",
    number: "120-17-100602-2",
    balance: 255000,
  },
  {
    bank: "GHB",
    color: "#ff8040",
    name: "GHB New Flexi",
    number: "440-19-400241-3",
    balance: 2000,
  },
  {
    bank: "GHB",
    color: "#ff8040",
    name: "GHB Premier Savings",
    number: "440-57-000502-4",
    balance: 2000,
  },
  {
    bank: "KTB",
    color: "#40c0ff",
    name: "KTB NEXT Savings",
    number: "066-7-87493-9",
    balance: 1000000,
  },
  {
    bank: "KTB",
    color: "#80c0ff",
    name: "KTB Savings",
    number: "489-2-48778-6",
    balance: 6254.65,
  },
  {
    bank: "Krungsri",
    color: "#ffc040",
    name: "Krungsri Online",
    number: "308-1-86393-9",
    balance: 990000,
  },
  {
    bank: "KBank",
    color: "#008040",
    name: "KBank K-eSavings",
    number: "301-1-66654-3",
    balance: 100000,
  },
  {
    bank: "KBank",
    color: "#40c080",
    name: "KBank Savings",
    number: "290-8-57477-6",
    balance: 2000,
  },
  {
    bank: "SCB",
    color: "#4000c0",
    name: "SCB EZ Savings",
    number: "714-301018-7",
    balance: 2000,
  },
  {
    bank: "SCB",
    color: "#8040c0",
    name: "SCB Savings",
    number: "714-301017-9",
    balance: 2000,
  },
];

export type Bank = {
  color: string;
  name: string;
  acronym: string;
};

export const banks: Bank[] = [
  { color: "#0000c0", name: "Bangkok Bank", acronym: "BBL" },
  { color: "#40c0ff", name: "Krungthai Bank", acronym: "KTB" },
  { color: "#ff8040", name: "Government Housing Bank", acronym: "GHB" },
  { color: "#008040", name: "Kasikorn Bank", acronym: "KBank" },
  { color: "#ffc040", name: "Bank of Ayudhaya", acronym: "BAY" },
  { color: "#4000c0", name: "Siam Commercial Bank", acronym: "SCB" },
];

export type AccountTransaction = {
  type: "Income/Expense" | "Internal Movement";
  date: string;
  sortOrder: number;
  incomeExpense?: {
    account: string;
    amount: number;
    balance: number;
    category: string;
  };
  internalMovement?: {
    accountFrom: string;
    accountTo: string;
    amount: number;
    balanceFrom: number;
    balanceTo: number;
  };
  notes: string;
};

export const accountTransactions: AccountTransaction[] = [
  {
    type: "Income/Expense",
    date: "2024-02-16",
    sortOrder: 0,
    incomeExpense: {
      account: "BBL Savings",
      amount: 3000,
      balance: 8500,
      category: "Interest",
    },
    notes: "savings interest",
  },
  {
    type: "Income/Expense",
    date: "2024-02-16",
    sortOrder: 1,
    incomeExpense: {
      account: "BBL Savings",
      amount: -750,
      balance: 7750,
      category: "Food",
    },
    notes: "ordering dinner",
  },
  {
    type: "Internal Movement",
    date: "2024-02-16",
    sortOrder: 2,
    internalMovement: {
      accountFrom: "BBL Savings",
      accountTo: "KTB Savings",
      amount: 4500,
      balanceFrom: 5500,
      balanceTo: 5500,
    },
    notes: "move to own account",
  },
];
