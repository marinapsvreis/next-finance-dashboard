import { NextApiRequest, NextApiResponse } from "next";
import AuthService from "@/services/auth-token";
import transactions from "./transactions.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const token = req.query.token as string | undefined;

  try {
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const decodedToken = await AuthService.openSessionToken(token);

    if (!decodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    } 

    return res.status(200).json({ message: "Dados do usuário", transactions });
    
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: "Internal server error" });
  } 
}