import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import React from "react";
import R1 from "@/assets/jay-wennington-N_Y88TWmGwA-unsplash.jpg";
import R2 from "@/assets/nick-karvounis-Ciqxn7FE4vE-unsplash.jpg";
import R3 from "@/assets/shawnanggg-nmpW_WwwVSc-unsplash.jpg";
import Link from "next/link";

const demos = [
  {
    url: R1,
    Name: "Goody Land",
    Location: "Mandalay",
    link: "/order",
  },
  {
    url: R2,
    Name: "Tasty Foods",
    Location: "Mandalay",
    link: "/order",
  },
  {
    url: R3,
    Name: "Swel Mel",
    Location: "Mandalay",
    link: "/order",
  },
];

const CompaniesDemo = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {demos.map((item, i) => (
        <Link href={item.link} key={i} style={{ textDecoration: "none" }}>
          <Card variant="outlined" sx={{ width: 220, m: 3 }}>
            <CardOverflow>
              <AspectRatio ratio="2">
                <Image
                  src={item.url}
                  loading="lazy"
                  alt=""
                  width={70}
                  height={70}
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography level="title-md">{item.Name}</Typography>
              <Typography level="body-sm" sx={{ mt: 0.5 }}>
                <Typography>{item.Location}</Typography>
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  );
};

export default CompaniesDemo;
