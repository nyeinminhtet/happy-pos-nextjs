import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { menuId, locationId, menuCategoryId } = req.body;
    const addedMenu = await prisma.menu_menu_categories_locations.create({
      data: {
        menu_categories_id: Number(menuCategoryId),
        menu_id: menuId,
        location_id: Number(locationId),
      },
    });
    return res.status(200).send(addedMenu);
  }
}
