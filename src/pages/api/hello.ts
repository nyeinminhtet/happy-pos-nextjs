// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { querCodeSend } from "@/utils/fileUpload";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  querCodeSend();
  res.status(200).json({ name: "John Doe" });
}
