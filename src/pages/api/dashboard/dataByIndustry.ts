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

    const groupedData: Record<string, { withdrawsSum: number; depositsSum: number }> = {};

    const currentDate = Date.now();

    filteredTransactions.forEach((transaction: Transaction) => {
      const amountInDollars = Number(transaction.amount) / 100;

      if (!groupedData[transaction.industry]) {
        groupedData[transaction.industry] = { withdrawsSum: 0, depositsSum: 0 };
      }

      if (transaction.transaction_type === 'withdraw') {
        groupedData[transaction.industry].withdrawsSum += amountInDollars;
      } else if (transaction.transaction_type === 'deposit') {
        groupedData[transaction.industry].depositsSum += amountInDollars;
      }
    });

    const result = Object.entries(groupedData).map(([industry, sums]) => ({
      industry,
      withdrawsSum: sums.withdrawsSum.toFixed(2),
      depositsSum: sums.depositsSum.toFixed(2),
    }));

    console.log('result', result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function getMonthYearKey(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getFullYear()}`;
}
