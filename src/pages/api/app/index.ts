import { getCartTotalPrice } from "@/utils";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let isOrderAppRequest =
    req.query.locationId && !isNaN(Number(req.query.locationId));

  if (isOrderAppRequest) {
    if (req.method === "GET") {
      const locationId = Number(req.query.locationId);
      const location = await prisma.locations.findFirst({
        where: { id: Number(locationId), is_archived: false },
      });

      const menusMenuCategoriesLocations =
        await prisma.menu_menu_categories_locations.findMany({
          where: {
            location_id: locationId,
            is_archived: false,
          },
        });

      const menuIds = menusMenuCategoriesLocations
        .map((item) => item.menu_id)
        .filter((item) => item !== null) as number[];

      const menuCategoryIds = menusMenuCategoriesLocations.map(
        (item) => item.menu_categories_id
      );

      const menus = await prisma.menus.findMany({
        where: { id: { in: menuIds }, is_archived: false },
      });

      const menuCategories = await prisma.menu_categories.findMany({
        where: { id: { in: menuCategoryIds }, is_archived: false },
      });

      const menuAddons = await prisma.addons_menus.findMany({
        where: { menu_id: { in: menuIds } },
      });

      const validAddonCategoryIds = menuAddons.map(
        (item) => item.addon_category_id
      ) as number[];

      const addonCategories = await prisma.addon_categories.findMany({
        where: { id: { in: validAddonCategoryIds }, is_archived: false },
      });

      const addons = await prisma.addons.findMany({
        where: {
          addon_category_id: { in: validAddonCategoryIds },
          is_archived: false,
        },
      });

      const orders = await prisma.orders.findMany({
        where: { location_id: locationId },
      });

      const orderIds = orders.map((item) => item.id);
      const orderlines = await prisma.orderlines.findMany({
        where: { order_id: { in: orderIds } },
      });
      res.status(200).send({
        locations: [location],
        menus,
        menuCategories,
        menusMenuCategoriesLocations,
        menuAddons,
        addonCategories,
        addons,
        orders,
        orderlines,
      });
    } else if (req.method === "POST") {
      const query = req.query;
      const locationId = query.locationId as string;
      const tableId = query.tableId as string;
      const cartItems = req.body.items;
      const isValid = locationId && tableId && cartItems.length;
      if (!isValid) return res.send(400);
      // create order

      const orderData = {
        location_id: Number(locationId),
        table_id: Number(tableId),
        is_paid: false,
        price: getCartTotalPrice(cartItems),
      };

      const newOrder = await prisma.orders.create({ data: orderData });

      cartItems.forEach(async (item: any) => {
        const menu = item.menu;
        const hasAddons = item.addons.length;
        if (hasAddons) {
          const addons = item.addons;
          const orderlineData = addons.map((addon: any) => ({
            cart_id: item.id,
            menus_id: menu.id,
            addons_id: addon.id,
            order_id: newOrder.id,
            quantity: item.quantity,
          }));
          await prisma.orderlines.createMany({ data: orderlineData });
        } else {
          await prisma.orderlines.create({
            data: {
              cart_id: item.id,
              menus_id: item.menu.id,
              order_id: newOrder.id,
              quantity: item.quantity,
            },
          });
        }
      });
      res.send(newOrder);
    }
  }
  const session = await getSession({ req });
  if (!session) return res.status(401).end();
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
    const newAddonCategoriesData = [{ name: "Drinks" }, { name: "Sizes" }];
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
    const tablesData = [
      {
        table_name: "Table-01",
        location_id: newLocation.id,
      },
      {
        table_name: "Table-02",
        location_id: newLocation.id,
      },
    ];
    return res.status(200).send({
      menus: newMenus,
      menuCategories: newMenuCategories,
      addons: newAddons,
      addonCategories: newAddonCategories,
      locations: newLocation,
      newMenusMenuCategoriesLocations,
      company: newCompany,
      orders: [],
      orderlines: [],
    });
  } else {
    const companyId = userFromdb.companies_id as number;
    const locations = await prisma.locations.findMany({
      where: {
        companies_id: companyId,
        is_archived: false,
      },
    });
    const locationIds = locations.map((row) => row.id);
    const menusMenuCategoriesLocations =
      await prisma.menu_menu_categories_locations.findMany({
        where: {
          location_id: {
            in: locationIds,
          },
        },
      });
    const menuCategoriesIds = menusMenuCategoriesLocations.map(
      (item) => item.menu_categories_id
    );
    const menuIds = menusMenuCategoriesLocations
      .map((item) => item.menu_id)
      .filter((item) => item !== null) as number[];

    const menus = await prisma.menus.findMany({
      where: {
        id: {
          in: menuIds,
        },
        is_archived: false,
      },
    });

    const menuCategories = await prisma.menu_categories.findMany({
      where: {
        id: {
          in: menuCategoriesIds,
        },
        is_archived: false,
      },
    });

    const menuAddons = await prisma.addons_menus.findMany({
      where: {
        menu_id: {
          in: menuIds,
        },
      },
    });

    const addonCategoryIds = menuAddons.map(
      (item) => item.addon_category_id
    ) as number[];

    const addonCategories = await prisma.addon_categories.findMany({
      where: {
        id: {
          in: addonCategoryIds,
        },
        is_archived: false,
      },
    });
    const addons = await prisma.addons.findMany({
      where: {
        addon_category_id: {
          in: addonCategoryIds,
        },
        is_archived: false,
      },
    });
    const company = await prisma.companies.findFirst({
      where: {
        id: companyId,
      },
    });
    const tables = await prisma.tables.findMany({
      where: {
        location_id: {
          in: locationIds,
        },
        is_archived: false,
      },
    });

    const orders = await prisma.orders.findMany({
      where: {
        location_id: {
          in: locationIds,
        },
      },
    });
    const orderIds = orders.map((item) => item.id);
    const orderlines = await prisma.orderlines.findMany({
      where: { order_id: { in: orderIds } },
    });
    return res.status(200).send({
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusMenuCategoriesLocations,
      company,
      menuAddons,
      tables,
      orders,
      orderlines,
    });
  }
}
