import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, menuIds } = req.body;
    const isValid = name && menuIds;
    if (!isValid)
      return res
        .status(401)
        .json({ message: "pls fill fully form for category!" });

    const newAddonCategory = await prisma.addon_categories.create({
      data: {
        name,
      },
    });

    const data = menuIds.map((menuId: number) => ({
      menu_id: menuId,
      addon_category_id: newAddonCategory.id,
    }));

    await prisma.addons_menus.createMany({
      data,
    });
    res.status(200).send("That's work");
  } else if (req.method === "PUT") {
    const { name, isRequire, menuIds, id } = req.body;
    const isValid = name || menuIds || isRequire;
    if (!isValid) return res.status(400).json({ message: "bad request!" });
    await prisma.addon_categories.update({
      data: {
        name,
        is_require: isRequire,
      },
      where: {
        id,
      },
    });

    if (!menuIds) return res.send(401);

    //find existing menus from menu_addoncategory
    const menuIdsAddonCategory = await prisma.addons_menus.findMany({
      where: {
        addon_category_id: id,
      },
    });

    const existiingMenuIds = menuIdsAddonCategory
      .map((item) => item.menu_id)
      .filter((item) => item);

    const addedMenuIds = menuIds.filter(
      (menuId: number) => !existiingMenuIds.includes(menuId)
    );

    const removedMenuIds = existiingMenuIds.filter(
      (item) => !menuIds.includes(item)
    );

    if (addedMenuIds.length) {
      const newMenIds = addedMenuIds.map((item: number) => ({
        menu_id: item,
        addon_category_id: id,
      }));

      await prisma.addons_menus.createMany({
        data: newMenIds,
      });
    }
    if (removedMenuIds.length) {
      removedMenuIds.forEach(async (item) => {
        const row = await prisma.addons_menus.findFirst({
          where: {
            menu_id: item,
            addon_category_id: id,
          },
        });
        if (row) {
          await prisma.addons_menus.delete({
            where: {
              id: row.id,
            },
          });
        }
      });
    }

    res.send(200);
  }
}
