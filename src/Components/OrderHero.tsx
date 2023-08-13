// import Image from "next/image";
// import React from "react";
// import order from "@/assets/Special.png";
// import { Box } from "@mui/material";

// const OrderHero = () => {
//   return (
//     <Box sx={{ position: "relative" }}>
//       <Image
//         alt="order-hero"
//         src={order}
//         width={800}
//         style={{
//           width: "100%",
//           objectFit: "contain",
//         }}
//       />
//     </Box>
//   );
// };

// export default OrderHero;

import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import order from "@/assets/Special.png";

export default function MediaCover() {
  return (
    <Box
      component="ul"
      color="primary"
      sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 0, m: 0 }}
    >
      <Card component="li" sx={{ minWidth: { xs: 200, sm: 300 }, flexGrow: 1 }}>
        <CardCover>
          <Image src={order} loading="lazy" alt="ss" width={200} height={200} />
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            fontWeight="bold"
            textColor="#E21818"
            mt={{ xs: 14, sm: 20, md: 38 }}
            fontSize={{ xs: 30 }}
          >
            50% off
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
