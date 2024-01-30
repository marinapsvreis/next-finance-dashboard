import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({log: ["query"]});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('hashed', hashedPassword)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

      },
    });

    return res.status(201).json(newUser);

  } catch (error) {
    console.error("Error during registration:", error);
    
  } 
}