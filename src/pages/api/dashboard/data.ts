import { NextApiRequest, NextApiResponse } from "next";
import AuthService from "@/services/auth-token";
import transactions from "./transactions.json"
import { JWTPayload } from "jose";

interface Transaction {
  date: string;
  industry: string;
  transaction_type: "deposit" | "withdraw";
  amount: string;
}

interface GroupedTransaction {
  totalRevenues: number;
  totalExpenses: number;
}

interface GroupedTransactions {
  [key: string]: {
    [industry: string]: GroupedTransaction;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { token, month, year } = req.query;

  try {
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const decodedToken: JWTPayload = await AuthService.openSessionToken(token as string);

    interface TransactionsData {
      data: Transaction[];
    }

    const transactionsArray: Transaction[] = (transactions as TransactionsData).data;

    const filterTransactions = (items: Transaction[], selectedMonth: string | undefined, selectedYear: string | undefined): Transaction[] => {
      return items.filter((item) => {
        const itemDate = new Date(item.date);
        const isWithinDateRange =
          (!selectedMonth || itemDate.getMonth() + 1 === Number(selectedMonth)) &&
          (!selectedYear || itemDate.getFullYear() === Number(selectedYear));
        return isWithinDateRange;
      });
    };

    const filteredTransactions: Transaction[] = filterTransactions(transactionsArray, month as string, year as string);

    const convertValuesAndDates = (items: Transaction[]): Transaction[] => {
      return items.map((item) => ({
        ...item,
        amount: (parseFloat(item.amount) / 100).toFixed(2),
        date: new Date(item.date).toLocaleDateString(),
      }));
    };

    const convertedTransactions: Transaction[] = convertValuesAndDates(filteredTransactions);

    const groupByFilters = (items: Transaction[]): GroupedTransactions => {
      return items.reduce((grouped, item) => {
        const { date, industry, transaction_type } = item;

        const itemDate = new Date(date);
        const month = itemDate.getMonth() + 1;
        const year = itemDate.getFullYear();
        const key = `${month.toString().padStart(2, '0')}/${year}`;

        if (!grouped[key]) {
          grouped[key] = {};
        }

        if (!grouped[key][industry]) {
          grouped[key][industry] = {
            totalRevenues: 0,
            totalExpenses: 0,
          };
        }

        const amount = parseFloat(item.amount);

        if (transaction_type === 'deposit') {
          grouped[key][industry].totalRevenues += amount;
        } else if (transaction_type === 'withdraw') {
          grouped[key][industry].totalExpenses += amount;
        }

        return grouped;
      }, {} as GroupedTransactions);
    };

    const groupedTransactions: GroupedTransactions = groupByFilters(convertedTransactions);

    const sortedKeys = Object.keys(groupedTransactions).sort(
      (keyA, keyB) => {
        const [monthA, yearA] = keyA.split('/').map(Number);
        const [monthB, yearB] = keyB.split('/').map(Number);

        if (yearA !== yearB) {
          return yearA - yearB;
        }
        return monthA - monthB;
      }
    );

    const orderedTransactions: GroupedTransactions = {};
    sortedKeys.forEach((key) => {
      orderedTransactions[key] = groupedTransactions[key];
    });

    return res.status(200).json({
      message: "User data",
      groupedByFilters: orderedTransactions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: 'Internal server error' });
  }
}