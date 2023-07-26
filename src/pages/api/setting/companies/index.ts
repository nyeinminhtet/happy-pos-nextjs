// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { name, address, id } = req.body;
    const isValid = name && address && id;
    if (!isValid) return res.status(400).end();

    const updateCompany = await prisma.companies.update({
      where: {
        id,
      },
      data: {
        name,
        address,
      },
    });
    return res.status(200).send(updateCompany);
  }
}
