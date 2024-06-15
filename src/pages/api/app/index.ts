// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { email, password } = req.body;
    const isValid = email && password;
    if (!isValid) return res.status(400).send("Bad request");

    const row = await prisma.user.create({ data: { email, password } });

    return res.status(200).json({ row });
  }
}
