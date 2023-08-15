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
      return res.status(200).end();
    } else {
      await prisma.menu_menu_categories_locations.create({
        data: {
          menu_id: menuId,
          location_id: locationIds[0],
          menu_categories_id: menuCategoryIds[0],
        },
      });
    }
    return res.status(200).send(menu);
  } else if (req.method === "PUT") {
    const { id, name, price, addonCategoryIds } = req.body;

    const updateMenu = await prisma.menus.update({
      data: {
        name,
        price,
      },
      where: {
        id: Number(id),
      },
    });
    if (addonCategoryIds.length) {
      const menuAddonCategories = await prisma.addons_menus.findMany({
        where: {
          menu_id: Number(id),
        },
      });

      const existingAddonCategories = menuAddonCategories
        .map((item) => item.addon_category_id)
        .filter((item) => item);

      const addedAddonCategories = addonCategoryIds.filter(
        (item: number) => !existingAddonCategories.includes(item)
      );
      const removedAddonCategories = existingAddonCategories.filter(
        (item) => !addonCategoryIds.includes(item)
      );

      if (addedAddonCategories) {
        const data = addedAddonCategories.map((item: number) => ({
          menu_id: Number(id),
          addon_category_id: item,
        }));
        await prisma.addons_menus.createMany({
          data,
        });
      }

      if (removedAddonCategories) {
        await prisma.addons_menus.deleteMany({
          where: {
            menu_id: Number(id),
            addon_category_id: { in: removedAddonCategories },
          },
        });
      }
    }
    return res.status(200).send(updateMenu);
  } else if (req.method === "DELETE") {
    const menuId = req.query.id;

    await prisma.menus.update({
      where: {
        id: Number(menuId),
      },
      data: {
        is_archived: true,
      },
    });
    return res.status(200).end();
  } else {
    return res.status(405).end();
  }
}
