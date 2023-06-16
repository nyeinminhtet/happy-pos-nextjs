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
    return res.send(200);
  } else if (req.method === "PUT") {
    const { name, address, id } = req.body;
    const isValid = name && address && id;
    if (!isValid) return res.send(400);
    await prisma.locations.update({
      where: {
        id: parseInt(id, 10),
      },
      data: { name, address },
    });
    res.send(200);
  } else {
    res.send(500);
  }
}
