type AccountTransaction =
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

type BankAccount = {
  color: string;
  bank: string;
  name: string;
  number: string;
  balance: number;
};

export const bankAccounts: BankAccount[] = [
  {
    color: "#000080",
    name: "BBL Savings",
    number: "123-456-7890",
    bank: "Bangkok Bank",
    balance: 4500,
  },
  {
    color: "#40C0FF",
    name: "KTB Savings",
    number: "098-765-4321",
    bank: "Krungthai Bank",
    balance: 7500,
  },
  {
    color: "#FF8040",
    name: "GHB All Savings",
    number: "024-681-3467",
    bank: "Government Housing Bank",
    balance: 9500,
  },
];

type Bank = {
  name: string;
  acronym: string;
  color: string;
};

export const banks: Bank[] = [
  { name: "Bangkok Bank", acronym: "BBL", color: "#000080" },
  { name: "Krungthai Bank", acronym: "KTB", color: "#40C0FF" },
  { name: "Government Housing Bank", acronym: "GHB", color: "#FF8040" },
  { name: "Kasikorn Bank", acronym: "KBank", color: "#008040" },
  { name: "Bank of Ayudhaya", acronym: "BAY", color: "#FFC040" },
  { name: "Siam Commercial Bank", acronym: "SCB", color: "#4000C0" },
];
