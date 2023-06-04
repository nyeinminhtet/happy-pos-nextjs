// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const locationId = parseInt(req.query.locationId as string, 10);
  if (!locationId) return res.status(400);
  const location = await prisma.locations.findFirst({
    where: {
      id: locationId,
    },
  });
  const menusMenuCategoriesLocations =
    await prisma.menu_menu_categories_locations.findMany({
      where: {
        location_id: locationId,
      },
    });

  const menuIds = menusMenuCategoriesLocations
    .map((item) => item.menu_id)
    .filter((item) => item !== null) as number[];
  const menuCategoriesIds = menusMenuCategoriesLocations.map(
    (item) => item.menu_categories_id
  ) as number[];

  const menus = await prisma.menus.findMany({
    where: {
      id: {
        in: menuIds,
      },
    },
  });
  const menuCategories = await prisma.menu_categories.findMany({
    where: {
      id: {
        in: menuCategoriesIds,
      },
    },
  });

  const addonMenu = await prisma.addons_menus.findMany({
    where: {
      menu_id: {
        in: menuIds,
      },
    },
  });
  const addonCatIds = addonMenu.map(
    (addonId) => addonId.addon_category_id
  ) as number[];
  const addonCats = await prisma.addon_categories.findMany({
    where: {
      id: {
        in: addonCatIds,
      },
    },
  });

  const addons = await prisma.addons.findMany({
    where: {
      addon_category_id: {
        in: addonCatIds,
      },
    },
  });
  res.send({
    location,
    menus,
    menuCategories,
    addons,
    addonCats,
    menusMenuCategoriesLocations,
  });
}
