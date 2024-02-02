import { NextApiRequest, NextApiResponse } from "next";
import AuthService from "@/services/auth-token";
import transactions from "./transactions.json";

interface Transaction {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { token } = req.query;

  try {
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const isValidToken = await AuthService.openSessionToken(Array.isArray(token) ? token[0] : token);

    if (!isValidToken) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const datesOfTransactions = Array.from(new Set(transactions.data.map((transaction: Transaction) => {
      const transactionDate = new Date(transaction.date);

      return `${(transactionDate.getMonth() + 1).toString().padStart(2, '0')}/${transactionDate.getFullYear()}`;
    }))).sort((a: any, b: any) => {
      const [monthA, yearA] = a.split('/').map(Number);
      const [monthB, yearB] = b.split('/').map(Number);

      if (yearA !== yearB) {
        return yearA - yearB;
      }

      return monthA - monthB;
    });

    const industriesList = Array.from(new Set(transactions.data.map((transaction: Transaction) => transaction.industry)));
    const accountsList = Array.from(new Set(transactions.data.map((transaction: Transaction) => transaction.account)));
    const statesList = Array.from(new Set(transactions.data.map((transaction: Transaction) => transaction.state)));

    return res.status(200).json({
      message: "Success",
      data: {
        dates: datesOfTransactions,
        industries: industriesList,
        accounts: accountsList,
        states: statesList,
      },
    });

  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });

  }
}
