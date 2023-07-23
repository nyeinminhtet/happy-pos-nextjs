import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, price, addonCategoryId } = req.body;
    const isValid = name && addonCategoryId;

    if (!isValid && !(price >= 0))
      return res.status(401).json({ message: "You need to more information" });

    const adddonsCreate = await prisma.addons.create({
      data: {
        name,
        price,
        addon_category_id: addonCategoryId,
      },
    });
    return res.status(200).send(adddonsCreate);
  } else if (req.method === "PUT") {
    const { id, name, price, addonCategoryId } = req.body;
    const isValid = !id && !name;
    if (isValid) return res.status(400).json({ message: "bad request!" });
    const addonsUpdate = await prisma.addons.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        addon_category_id: Number(addonCategoryId),
      },
    });
    return res.status(200).send(addonsUpdate);
  } else if (req.method === "DELETE") {
    const id = Number(req.query.id);
    await prisma.addons.update({
      where: { id },
      data: {
        is_archived: true,
      },
    });
    return res.status(200).end();
  }
}
