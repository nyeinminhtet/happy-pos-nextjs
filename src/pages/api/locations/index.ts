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
    const locationCreate = await prisma.locations.create({
      data: {
        name,
        address,
        companies_id: companyId,
      },
    });
    return res.status(200).send(locationCreate);
  } else if (req.method === "PUT") {
    const { name, address, id } = req.body;
    const isValid = name && address && id;
    if (!isValid) return res.send(400);
    const locationUpdate = await prisma.locations.update({
      where: {
        id: parseInt(id, 10),
      },
      data: { name, address },
    });
    return res.status(200).send(locationUpdate);
  } else if (req.method === "DELETE") {
    const id = Number(req.query.id);
    await prisma.locations.update({
      where: {
        id,
      },
      data: {
        is_archived: true,
      },
    });
    return res.status(200).end();
  } else {
    return res.status(500).end();
  }
}
