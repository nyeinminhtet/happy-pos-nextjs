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
          width: { xs: 180, sm: 180, md: 230 },
          height: { xs: 180, sm: 180, md: 230 },
          py: 2,
          borderRadius: 6,
        }}
      >
        {menu.acess_url && (
          <CardMedia
            sx={{
              height: { xs: 110, sm: 120, md: 150 },
              backgroundSize: "contain",
            }}
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
            variant="h6"
            sx={{
              textAlign: "center",
              fontSize: { xs: "13px", md: "20px" },
              mt: { xs: -1 },
            }}
          >
            {menu.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: -1,
            }}
          >
            <PaidIcon
              color="success"
              sx={{ fontSize: { xs: "15px", md: "20px" } }}
            />
            <Typography
              gutterBottom
              variant="subtitle1"
              sx={{
                ml: 0.8,
                fontSize: { xs: "14px", md: "16px" },
              }}
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
