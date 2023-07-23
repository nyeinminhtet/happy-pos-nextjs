import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const companyId = req.query.companyId;
    const isValid = companyId;
    if (!isValid) return res.status(400).end();
    const locations = await prisma.locations.findMany({
      where: { companies_id: Number(companyId) },
    });
    return res.status(200).send(locations);
  } else if (req.method === "POST") {
    const { name, address, companyId } = req.body;
    const isValid = name && address;
    if (!isValid) return res.status(401).end();
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
    if (!isValid) return res.status(400).end();
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
