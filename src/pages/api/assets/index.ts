import { fileUpload } from "@/utils/fileUpload";
import { Request, Response } from "express";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

type CustomNextApiRequest = NextApiRequest &
  Request & {
    files: any[];
  };

type CustomNextApiResponse = NextApiResponse & Response;

export default async function handler(
  req: CustomNextApiRequest,
  res: CustomNextApiResponse
) {
  try {
    fileUpload(req, res, async (error) => {
      if (error) return res.status(500).send(error);
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      return res.send({ assetUrl });
    });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}
