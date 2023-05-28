import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, address, companyId } = req.body;
    const isValid = name && address;
    if (!isValid) return res.send(401);
    await prisma.locations.create({
      data: {
        name,
        address,
        companies_id: companyId,
      },
    });
    res.send(200);
  } else {
    res.send(500);
  }
}
