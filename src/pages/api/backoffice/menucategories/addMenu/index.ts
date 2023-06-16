import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { menuId, locationId, menuCategoryId } = req.body;
    await prisma.menu_menu_categories_locations.create({
      data: {
        menu_categories_id: Number(menuCategoryId),
        menu_id: menuId,
        location_id: Number(locationId),
      },
    });
    return res.send(200);
  }
}
