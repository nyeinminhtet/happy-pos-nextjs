import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { category, locationId } = req.body;
    if (!category) return res.status(400);
    const menuCategory = await prisma.menu_categories.create({
      data: {
        category,
      },
    });
    await prisma.menu_menu_categories_locations.create({
      data: {
        menu_categories_id: menuCategory.id,
        location_id: locationId,
      },
    });
  }
  res.send(200);
}