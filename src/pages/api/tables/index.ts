import { getQrCodeUrl } from "@/utils";
import { prisma } from "@/utils/db";
import { querCodeSend } from "@/utils/fileUpload";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.send(400);
    const table = await prisma.tables.create({
      data: {
        table_name: name,
        location_id: Number(locationId),
      },
    });
    await querCodeSend(locationId, table.id);
    const qrCodeUrl = getQrCodeUrl(Number(locationId), table.id);
    console.log(qrCodeUrl);
    await prisma.tables.update({
      data: { asset_url: qrCodeUrl },
      where: { id: table.id },
    });
    return res.status(200).send(table);
  } else if (req.method === "PUT") {
    const { tableId, name } = req.body;
    const tableUpdate = await prisma.tables.update({
      data: { table_name: name },
      where: { id: Number(tableId) },
    });
    return res.status(200).send(tableUpdate);
  }
  return res.status(405).end();
}
