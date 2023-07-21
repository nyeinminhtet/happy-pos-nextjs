import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let queryMenuIds = req.query.menuIds as string;
    const isValid = queryMenuIds;
    if (!isValid) return res.status(400).send("Bad request");
    const menuIds = queryMenuIds.split(",").map((item) => Number(item));
    const menusAddonCategories = await prisma.addons_menus.findMany({
      where: {
        menu_id: { in: menuIds },
      },
    });
    return res.status(200).send(menusAddonCategories);
  }
  res.status(405).send("Method not allowed");
}
