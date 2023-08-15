// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCartTotalPrice } from "@/utils";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const query = req.query;
    const locationId = query.locationId as string;
    const tableId = query.tableId as string;
    const cart = req.body.items;

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
    return res.status(200).send(order);
  }
}
