import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, price, addonCategoryId } = req.body;
    const isValid = name && price && addonCategoryId;

    if (!isValid)
      return res.status(401).json({ message: "You need to more information" });

    await prisma.addons.create({
      data: {
        name,
        price,
        addon_category_id: addonCategoryId,
      },
    });
    return res.send(200);
  } else if (req.method === "PUT") {
    const { id, name, price, addonCategoryId } = req.body;
    console.log("req", req.body.name);
    // const isValid = !id && !name;
    // if (!isValid) return res.send(400);
    await prisma.addons.delete({
      where: {
        id,
      },
    });
    await prisma.addons.create({
      data: {
        name,
        price,
        addon_category_id: addonCategoryId,
      },
    });
    res.send(200);
  }
}
