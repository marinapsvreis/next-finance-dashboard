import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import AuthService from "@/services/auth-token";
import prisma from "@/services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const response = await AuthService.createSessionToken({ id: user.id, email: user.email });

    return res.status(200).json({ message: "Login successful", userId: user.id, token: response});
  } catch (error) {
  
    console.error("Error during login:", error);
    
    return res.status(500).json({ error: "Internal server error" });
  } 
}