import { Box } from "@mui/material";
import Link from "next/link";
import { menus as Menu } from "@prisma/client";
import PaidIcon from "@mui/icons-material/Paid";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Image from "next/image";

interface Props {
  menu: Menu;
  href: string | object;
}

const MenuCard = ({ menu, href }: Props) => {
  return (
    <Link
      key={menu.id}
      href={href}
      style={{
        textDecoration: "none",
        marginRight: "15px",
        marginBottom: "20px",
      }}
    >
      <Card sx={{ width: { xs: 120, sm: 250 }, position: "static" }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <Image
              src={menu.acess_url || ""}
              width={200}
              height={200}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-md">{menu.name}</Typography>
          <Typography
            level="body-sm"
            sx={{ display: "flex", alignItems: "center", fontSize: 15 }}
          >
            <PaidIcon
              color="primary"
              sx={{ fontSize: { xs: "17px", md: "20px" } }}
            />
            {menu.price}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
