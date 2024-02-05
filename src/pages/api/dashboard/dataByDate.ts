import { NextApiRequest, NextApiResponse } from "next";
import transactionsData from "./transactions.json";

interface Transaction {
  date: number;
  amount: string;
  transaction_type: string;
  currency: string;
  account: string;
  industry: string;
  state: string;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { months, industries, accounts, states } = req.query;

    const filteredTransactions = transactionsData.data.filter(
      (transaction: Transaction) =>
        (!months || months.includes(getMonthYearKey(transaction.date))) &&
        (!industries || industries.includes(transaction.industry)) &&
        (!accounts || accounts.includes(transaction.account)) &&
        (!states || states.includes(transaction.state))
    );

    const groupedData: Record<
      string,
      { withdrawsSum: number; depositsSum: number }
    > = {};

    filteredTransactions.forEach((transaction: Transaction) => {
      const amountInDollars = Number(transaction.amount) / 100;
      const monthYearKey = getMonthYearKey(transaction.date);

      if (!groupedData[monthYearKey]) {
        groupedData[monthYearKey] = { withdrawsSum: 0, depositsSum: 0 };
      }

      if (transaction.transaction_type === "withdraw") {
        groupedData[monthYearKey].withdrawsSum += amountInDollars;
      } else if (transaction.transaction_type === "deposit") {
        groupedData[monthYearKey].depositsSum += amountInDollars;
      }
    });

    const result = Object.entries(groupedData)
      .map(([monthYear, sums]) => ({
        monthYear,
        withdrawsSum: sums.withdrawsSum.toFixed(2),
        depositsSum: sums.depositsSum.toFixed(2),
      }))
      .sort((a, b) => {
        const [monthA, yearA] = a.monthYear.split("/").map(Number);
        const [monthB, yearB] = b.monthYear.split("/").map(Number);

        if (yearA !== yearB) {
          return yearA - yearB;
        }
        return monthA - monthB;
      });
    
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function getMonthYearKey(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getFullYear()}`;
}
