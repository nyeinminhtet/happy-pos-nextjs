import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.send(401);
  const user = session.user;
  const name = user?.name as string;
  const email = user?.email as string;
  const userFromdb = await prisma.users.findFirst({ where: { email } });
  if (!userFromdb) {
    const newCompany = await prisma.companies.create({
      data: {
        name: "Default company",
        address: "default address",
      },
    });
    await prisma.users.create({
      data: {
        name,
        email,
        password: "",
        companies_id: newCompany.id,
      },
    });
    const newLocation = await prisma.locations.create({
      data: {
        name: "default location",
        address: "default address",
        companies_id: newCompany.id,
      },
    });
    const newMenusData = [
      { name: "shan-khoute-swell", price: 1000 },
      { name: "mote-tee", price: 1500 },
    ];
    const newMenus = await prisma.$transaction(
      newMenusData.map((menu) => prisma.menus.create({ data: menu }))
    );

    const newMenuCategoriesData = [
      { category: "Default category 1" },
      { category: "Default category 2" },
    ];
    const newMenuCategories = await prisma.$transaction(
      newMenuCategoriesData.map((menucategory) =>
        prisma.menu_categories.create({ data: menucategory })
      )
    );
    const newMenusMenuCategoriesLocationsData = [
      {
        menu_id: newMenus[0].id,
        menu_categories_id: newMenuCategories[0].id,
        location_id: newLocation.id,
      },
      {
        menu_id: newMenus[1].id,
        menu_categories_id: newMenuCategories[1].id,
        location_id: newLocation.id,
      },
    ];
    const newMenusMenuCategoriesLocations = await prisma.$transaction(
      newMenusMenuCategoriesLocationsData.map(
        (newMenusMenuCategoriesLocations) =>
          prisma.menu_menu_categories_locations.create({
            data: newMenusMenuCategoriesLocations,
          })
      )
    );
    const newAddonCategoriesData = [
      { category_of_addon: "Drinks" },
      { category_of_addon: "Sizes" },
    ];
    const newAddonCategories = await prisma.$transaction(
      newAddonCategoriesData.map((addonCategory) =>
        prisma.addon_categories.create({ data: addonCategory })
      )
    );
    const newAddonsData = [
      {
        name: "Cola",
        price: 500,
        addon_category_id: newAddonCategories[0].id,
      },
      {
        name: "Pepsi",
        price: 500,
        addon_category_id: newAddonCategories[0].id,
      },
      {
        name: "Large",
        price: 200,
        addon_category_id: newAddonCategories[1].id,
      },
      {
        name: "Normal",
        price: 0,
        addon_category_id: newAddonCategories[1].id,
      },
    ];
    const newAddons = await prisma.$transaction(
      newAddonsData.map((addon) => prisma.addons.create({ data: addon }))
    );
    await prisma.addons_menus.createMany({
      data: [
        {
          menu_id: newMenus[0].id,
          addon_category_id: newAddonCategories[0].id,
        },
        {
          menu_id: newMenus[1].id,
          addon_category_id: newAddonCategories[1].id,
        },
      ],
    });
    return res.send({
      menus: newMenus,
      menuCategories: newMenuCategories,
      addons: newAddons,
      addonCategories: newAddonCategories,
      locations: newLocation,
      newMenusMenuCategoriesLocations,
      company: newCompany,
    });
  } else {
    const companyId = userFromdb.companies_id as number;
    const locations = await prisma.locations.findMany({
      where: {
        companies_id: companyId,
      },
    });
    const locationIds = locations.map((row) => row.id);
    const menuMenuCategoriesLocations =
      await prisma.menu_menu_categories_locations.findMany({
        where: {
          location_id: {
            in: locationIds,
          },
        },
      });
    const menuCategoriesIds = menuMenuCategoriesLocations.map(
      (item) => item.menu_categories_id
    );
    const menuIds = menuMenuCategoriesLocations.map(
      (item) => item.menu_id
    ).filter((item)=>item !==null) as number[];
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

    const menuAddons = await prisma.addons_menus.findMany({
      where: {
        menu_id: {
          in: menuIds,
        },
      },
    });
    const addonIds = menuAddons.map(
      (item) => item.addon_category_id
    ) as number[];
    const addonCategories = await prisma.addon_categories.findMany({
      where: {
        id: {
          in: addonIds,
        },
      },
    });
    const addons = await prisma.addons.findMany({
      where: {
        id: {
          in: addonIds,
        },
      },
    });
    const company = await prisma.companies.findFirst({
      where: {
        id: companyId,
      },
    });
    res.send({
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuMenuCategoriesLocations,
      company,
    });
  }

  // if (!email) return res.send(400);
  // const newuser = await prisma.users.findFirst({
  //   where: {
  //     email,
  //   },
  // });
  // if (!user) return res.send(400);
}
