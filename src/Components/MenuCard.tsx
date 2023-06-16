import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";
import { menus as Menu } from "@prisma/client";

interface Props {
  menu: Menu;
}

const MenuCard = ({ menu }: Props) => {
  return (
    <Link
      key={menu.id}
      href={`/backoffice/menus/${menu.id}`}
      style={{
        textDecoration: "none",
        marginRight: "15px",
        marginBottom: "20px",
      }}
    >
      <Card sx={{ width: 300, height: 300 }}>
        <CardMedia
          sx={{ height: 200 }}
          image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
          title="green iguana"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              {menu.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {menu.description}
            </Typography>
          </Box>
          <Typography sx={{ color: "blue" }}>{menu.price} K</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
