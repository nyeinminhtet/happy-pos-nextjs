import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { category, locationIds } = req.body;
    if (!category) return res.status(400);
    const menuCategory = await prisma.menu_categories.create({
      data: {
        category,
      },
    });

    const menusMenuCategoriesLocationsData = locationIds.map(
      (locationId: number) => ({
        menu_categories_id: menuCategory.id,
        location_id: locationId,
      })
    );
    await prisma.menu_menu_categories_locations.createMany({
      data: menusMenuCategoriesLocationsData,
    });
    return res.status(200).send(menuCategory);
  } else if (req.method === "PUT") {
    const { id, category, locations, menuIds } = req.body;
    const isValid = id && category && locations;
    if (!isValid) return res.status(400);
    const menuCategoryId = Number(id);
    const locationIds = locations.map((location: any) => location.id);
    // let's first update name
    const updateMenuCategory = await prisma.menu_categories.update({
      data: {
        category,
      },
      where: { id: menuCategoryId },
    });

    // when locations are empty array that means user remove selected locations
    if (!locationIds.length) {
      await prisma.menu_menu_categories_locations.updateMany({
        data: {
          location_id: null,
        },
        where: {
          menu_categories_id: menuCategoryId,
        },
      });
      return res.status(200).end();
    }

    //first get all existing rows on menu_menucategroies_locations
    const menusMenuCategoriesLocations =
      await prisma.menu_menu_categories_locations.findMany({
        where: { menu_categories_id: menuCategoryId },
      });

    //existing locations from db
    const existingLocations = menusMenuCategoriesLocations
      .map((item) => item.location_id)
      .filter((item) => item);

    //find out which locations is new locations
    const newLocations = locationIds.filter(
      (item: any) => !existingLocations.includes(item)
    );

    //remove old locations from client
    const removedLocations = existingLocations.filter(
      (item) => !locationIds.includes(item)
    ) as number[];

    if (newLocations.length) {
      const addNewLocations = newLocations.map((item: number) => ({
        menu_categories_id: menuCategoryId,
        location_id: item,
      }));

      await prisma.menu_menu_categories_locations.createMany({
        data: addNewLocations,
      });
    }

    if (removedLocations.length) {
      removedLocations.forEach(async (locationId) => {
        const row = await prisma.menu_menu_categories_locations.findFirst({
          where: {
            location_id: locationId,
            menu_categories_id: menuCategoryId,
          },
        });
        if (row) {
          if (row.menu_id) {
            await prisma.menu_menu_categories_locations.update({
              data: { location_id: null },
              where: { id: row.id },
            });
          } else {
            await prisma.menu_menu_categories_locations.delete({
              where: { id: row.id },
            });
          }
        }
      });
    }
    return res.status(200).send(updateMenuCategory);
  } else if (req.method === "DELETE") {
    const id = Number(req.query.id);
    await prisma.menu_categories.update({
      where: {
        id,
      },
      data: {
        is_archived: true,
      },
    });
    return res.status(200).end();
  }
}
