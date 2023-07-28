import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../config/config";
import QRCode from "qrcode";
import { generateLinkForQRCode } from ".";

// Set S3 endpoint to DigitalOcean Spaces
const s3Client = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

export const qrCodeSend = async (locationId: number, tableId: number) => {
  const qrImageData = await QRCode.toDataURL(
    generateLinkForQRCode(locationId, tableId)
  );
  const input = {
    Bucket: "msquarefdc",
    Key: `happy-pos/qrcode/jey_qrcode/locationId-${locationId}-tableId-${tableId}.png`,
    ACL: "public-read",
    Body: Buffer.from(
      qrImageData.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    ),
  };
  const command = new PutObjectCommand(input);
  await s3Client.send(command);
};

// Change bucket property to your Space name
export const fileUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (request, file, cb) {
      console.log(file);
      cb(null, `happy-pos/jey/${Date.now()}_${file.originalname}`);
    },
  }),
}).array("files", 1);
