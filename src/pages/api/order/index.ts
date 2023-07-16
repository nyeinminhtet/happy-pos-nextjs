// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCartTotalPrice } from "@/utils";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const locationId = parseInt(req.query.locationId as string, 10);
    if (!locationId) return res.status(400);
    const location = await prisma.locations.findFirst({
      where: {
        id: locationId,
        is_archived: false,
      },
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
    const menuCategoriesIds = menusMenuCategoriesLocations.map(
      (item) => item.menu_categories_id
    ) as number[];

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

    const addonCategories = await prisma.addon_categories.findMany({
      where: {
        id: {
          in: addonCatIds,
        },
        is_archived: false,
      },
    });

    const addons = await prisma.addons.findMany({
      where: {
        addon_category_id: {
          in: addonCatIds,
        },
        is_archived: false,
      },
    });

    const orders = await prisma.orders.findMany({
      where: {
        location_id: locationId,
      },
    });

    const orderIds = orders.map((item) => item.id);
    const orderlines = await prisma.orderlines.findMany({
      where: {
        order_id: {
          in: orderIds,
        },
      },
    });
    return res.status(200).send({
      location: [location],
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusMenuCategoriesLocations,
      addonMenu,
      orders,
      orderlines,
    });
  } else if (req.method === "POST") {
    const query = req.query;
    const locationId = query.locationId as string;
    const tableId = query.tableId as string;
    const cart = req.body.cart;
    const isValid = locationId && tableId && cart.length;
    if (!isValid) return res.status(400).end();

    const order = await prisma.orders.create({
      data: {
        location_id: Number(locationId),
        table_id: Number(tableId),
        price: getCartTotalPrice(cart),
      },
    });

    cart.forEach(async (orderline: any) => {
      const menu = orderline.menu;
      const hasAddons = orderline.addons.length;
      const cartId = orderline.id as string;
      if (hasAddons) {
        const addonData = orderline.addons;
        const orderlinesData = addonData.map((item: any) => ({
          menus_id: menu.id,
          addons_id: item.id,
          order_id: order.id,
          quantity: orderline.quantity,
          cart_id: cartId,
        }));
        await prisma.orderlines.createMany({
          data: orderlinesData,
        });
      } else {
        await prisma.orderlines.createMany({
          data: {
            menus_id: menu.id,
            order_id: order.id,
            quantity: orderline.quantity,
            cart_id: cartId,
          },
        });
      }
    });
    return res.status(200).send({ order });
  }
}
