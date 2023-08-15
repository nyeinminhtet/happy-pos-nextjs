import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Link,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import React from "react";
import R1 from "@/assets/jay-wennington-N_Y88TWmGwA-unsplash.jpg";
import R2 from "@/assets/nick-karvounis-Ciqxn7FE4vE-unsplash.jpg";
import R3 from "@/assets/shawnanggg-nmpW_WwwVSc-unsplash.jpg";

const demos = [
  {
    url: R1,
    Name: "Goody Land",
    Location: "Mandalay",
    link: "/order?locationId=1&tableId=4",
  },
  {
    url: R2,
    Name: "Tasty Foods",
    Location: "Mandalay",
    link: "#",
  },
  {
    url: R3,
    Name: "Swel Mel",
    Location: "Mandalay",
    link: "#",
  },
];

const CompaniesDemo = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {demos.map((item, i) => (
        <Card variant="outlined" key={i} sx={{ width: 220, m: 3 }}>
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
            <Typography level="title-md">
              <Link href={item.link} overlay underline="none">
                {item.Name}
              </Link>
            </Typography>
            <Typography level="body-sm" sx={{ mt: 0.5 }}>
              <Typography>{item.Location}</Typography>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CompaniesDemo;
