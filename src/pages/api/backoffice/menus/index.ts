//import { pool } from "@/utils/db";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      name,
      price,
      assetUrl = "",
      locationIds,
      menuCategoryIds,
      description = "",
    } = req.body;
    console.log("back", menuCategoryIds);
    const isValid = name && price && menuCategoryIds && locationIds;
    if (!isValid) return res.send(400);
    const menu = await prisma.menus.create({
      data: {
        name,
        price,
        acess_url: assetUrl,
        description,
      },
    });
    const menuId = menu.id;
    if (menuCategoryIds.length > 1) {
      const data = menuCategoryIds.map((menuCategoryId: number) => ({
        menu_id: menuId,
        location_id: locationIds[0],
        menu_categories_id: menuCategoryId,
      }));
      await prisma.menu_menu_categories_locations.createMany({
        data,
      });
    } else {
      await prisma.menu_menu_categories_locations.create({
        data: {
          menu_id: menuId,
          location_id: locationIds[0],
          menu_categories_id: menuCategoryIds[0],
        },
      });
    }
  } else if (req.method === "PUT") {
    const { id, name, price, menuCategoryIds, locationId } = req.body;
    await prisma.menus.update({
      data: {
        name: name,
        price: price,
      },
      where: {
        id,
      },
    });
    if (menuCategoryIds.length) {
      await prisma.menu_menu_categories_locations.deleteMany({
        where: { menu_id: id },
      });
    }
    const data = menuCategoryIds.map((menuCategoryId: number) => ({
      menu_id: id,
      menu_categories_id: menuCategoryId,
      location_id: parseInt(locationId, 10),
    }));
    await prisma.menu_menu_categories_locations.createMany({
      data,
    });
    res.send(200);
  }

  res.send(200);
}
