import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";
import { menus as Menu } from "@prisma/client";

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
      <Card
        sx={{
          width: 250,
          height: 250,
          py: 2,
        }}
      >
        {menu.acess_url && (
          <CardMedia
            sx={{ height: 180, backgroundSize: "contain" }}
            image={menu.acess_url || ""}
          />
        )}

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{ textAlign: "center" }}
            component="div"
          >
            {menu.name}
          </Typography>
          <Typography sx={{ color: "blue" }}>{menu.price} kyat</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
