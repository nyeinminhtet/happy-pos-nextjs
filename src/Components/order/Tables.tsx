import { AspectRatio, Box, Card, Typography } from "@mui/joy";
import Image from "next/image";
import React from "react";
import qr1 from "@/assets/qrcodes/locationId-1-tableId-8.png";
import qr2 from "@/assets/qrcodes/locationId-1-tableId-9.png";
import qr3 from "@/assets/qrcodes/locationId-1-tableId-10.png";
import { useRouter } from "next/router";
import Link from "next/link";

const tableData = [
  {
    tableName: "Table-01",
    qrcode: qr1,
    query: "/order?locationId=1&tableId=8",
  },
  {
    tableName: "Table-02",
    qrcode: qr2,
    query: "/order?locationId=1&tableId=9",
  },
  {
    tableName: "Table-03",
    qrcode: qr3,
    query: "/order?locationId=1&tableId=10",
  },
];

const Tables = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        mt: { xs: 3, md: 10 },
        cursor: "pointer",
        flexDirection: "column",
        w: "100%",
      }}
    >
      <Typography level="h2" fontSize={{ xs: 25, sm: 30 }}>
        Choose Table for order
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {tableData.map((item, i) => (
          <Link key={i} href={item.query}>
            <Card
              sx={{
                maxWidth: { xs: 250, md: 300 },
                bgcolor: "initial",
                m: 3,
              }}
            >
              <Image
                src={item.qrcode}
                loading="lazy"
                alt="table"
                width={150}
                height={150}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  level="title-sm"
                  sx={{ fontSize: "sm", fontWeight: "md" }}
                >
                  {item.tableName}
                </Typography>
              </Box>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Tables;
