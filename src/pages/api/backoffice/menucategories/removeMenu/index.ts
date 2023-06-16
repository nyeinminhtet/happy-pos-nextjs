import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { menuId, locationId, menuCategoryId } = req.body;
    const isValid = menuId && locationId && menuCategoryId;
    if (!isValid) return res.send(400);
    await prisma.menu_menu_categories_locations.deleteMany({
      where: {
        menu_id: menuId,
        menu_categories_id: Number(menuCategoryId),
        location_id: Number(locationId),
      },
    });
    return res.send(200);
  }
  return res.send(500);
}
