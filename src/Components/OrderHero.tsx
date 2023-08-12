import Image from "next/image";
import React from "react";
import order from "@/assets/Special.png";
import { Box } from "@mui/material";

const OrderHero = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Image
        alt="order-hero"
        src={order}
        width={800}
        style={{
          width: "100%",
          objectFit: "contain",
        }}
      />
      {/* <div
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "red",
          height: 200,
          width: "100%",
        }}
      /> */}
    </Box>
  );
};

export default OrderHero;
