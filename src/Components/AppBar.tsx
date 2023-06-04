import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Link from "next/link";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { signOut, useSession } from "next-auth/react";
import { getLocationId } from "@/utils";
import { BackofficeContext } from "@/Contents/BackofficeContext";

export const sidebarMenuItems = [
  {
    id: 1,
    label: "Orders",
    icon: <FastfoodIcon />,
    route: "/backoffice/orders",
  },
  {
    id: 2,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/backoffice/menus",
  },
  {
    id: 3,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/backoffice/menucategories",
  },
  {
    id: 4,
    label: "Addons",
    icon: <LunchDiningIcon />,
    route: "/backoffice/addons",
  },
  {
    id: 5,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/backoffice/addoncategories",
  },
  {
    id: 6,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/backoffice/locations",
  },
  {
    id: 7,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
  },
];

interface Props {
  title?: string;
}

const MenuAppBar = ({ title }: Props) => {
  const { data } = useSession();
  const locationId = getLocationId() as string;
  const { locations } = useContext(BackofficeContext);
  const selectedLocation = locations.find(
    (location) => location.id === Number(locationId)
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            background: "#820000",
          }}
        >
          {data ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h2 style={{ fontSize: "1.2rem", marginLeft: "10px" }}>
                {selectedLocation ? selectedLocation.name : ""}
              </h2>

              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  Sarr-Mall
                </Typography>
              </Box>
              <Button
                variant="text"
                onClick={() => signOut()}
                sx={{ color: "#E8F6EF" }}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Sarr-Mall
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default MenuAppBar;
