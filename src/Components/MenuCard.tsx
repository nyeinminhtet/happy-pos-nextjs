import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";
import { menus as Menu } from "@prisma/client";
import PaidIcon from "@mui/icons-material/Paid";

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
          pb: 2,
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
            variant="h6"
            sx={{ textAlign: "center", mb: 0 }}
          >
            {menu.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PaidIcon color="success" />
            <Typography
              gutterBottom
              variant="subtitle1"
              sx={{ mt: 0.8, ml: 0.8 }}
            >
              {menu.price} Kyat
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
