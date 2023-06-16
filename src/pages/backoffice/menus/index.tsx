import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { getLocationId, getMenusByLocationId } from "@/utils";
import Layout from "@/Components/Layout";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import NewMenu from "./NewMenu";
import MenuCard from "@/Components/MenuCard";

const Menus = () => {
  const { menus, fetchData, menuMenuCategoriesLocations } =
    useContext(BackofficeContext);
  const [open, setOpen] = useState(false);
  const locationId = getLocationId() as string;

  const validMenus = getMenusByLocationId(
    locationId,
    menuMenuCategoriesLocations,
    menus
  );

  return (
    <Layout title="menus">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "0 auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#4E6C50",
              width: "fit-content",
              color: "#E8F6EF",
              mb: 2,
              ":hover": {
                bgcolor: "#820000", // theme.palette.primary.main
                color: "white",
              },
            }}
          >
            New menu
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validMenus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} />
          ))}
        </Box>
      </Box>
      <NewMenu open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Menus;
