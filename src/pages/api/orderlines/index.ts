// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { cartId, status } = req.body;
    const isValid = cartId.length && status;
    if (!isValid) return res.status(400).send("Bad request");
    await prisma.orderlines.updateMany({
      data: {
        status,
      },
      where: { cart_id: cartId },
    });
    return res.send(200);
  }
  res.status(405).send("Method not allowed");
}
