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

    let withdrawsSum = 0;
    let depositsSum = 0;
    let futureTransactionsSum = 0;

    const currentDate = Date.now();

    filteredTransactions.forEach((transaction: Transaction) => {
      const amountInDollars = Number(transaction.amount) / 100;

      if (transaction.transaction_type === 'withdraw') {
        withdrawsSum += amountInDollars;
      } else if (transaction.transaction_type === 'deposit') {
        depositsSum += amountInDollars;
      }

      if (transaction.date > currentDate) {
        futureTransactionsSum += amountInDollars;
      }
    });

    const response = {
      withdrawsSum: withdrawsSum.toFixed(2),
      depositsSum: depositsSum.toFixed(2),
      futureTransactionsSum: futureTransactionsSum.toFixed(2),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Helper function to get month/year key from timestamp
function getMonthYearKey(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getFullYear()}`;
}
