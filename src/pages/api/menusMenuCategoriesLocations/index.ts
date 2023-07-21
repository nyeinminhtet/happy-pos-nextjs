import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const locationId = Number(req.query.locationId);
    const isValid = locationId;
    if (!isValid) return res.status(400).send("Bad request");
    const menusMenuCategoriesLocations =
      await prisma.menu_menu_categories_locations.findMany({
        where: {
          location_id: locationId,
          is_archived: false,
        },
      });
    return res.status(200).send(menusMenuCategoriesLocations);
  }
  res.status(405).send("Method not allowed");
}
