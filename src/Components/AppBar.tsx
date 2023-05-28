import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getAccessToken, getLocationId } from "@/utils";
import { signOut, useSession } from "next-auth/react";
import { BackofficeContent } from "@/Contents/BackofficeContent";

const sidebarMenuItems = [
  { id: 1, label: "Orders", icon: <FastfoodIcon />, route: "/orders" },
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
  const [showNavigation, setShowNavigation] = useState(false);
  const { locations } = useContext(BackofficeContent);
  const { data } = useSession();
  const [routerInfo, setRouterInfo] = useState({
    name: "login",
    route: "/login",
  });
  const selectedLocationId = getLocationId();
  const selectedLocation =
    locations &&
    Array.isArray(locations) &&
    locations.find((location) => String(location.id) === selectedLocationId);
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              onClick={() => setShowNavigation((prev) => !prev)}
            >
              <MenuIcon htmlColor="white" fontSize="large" />
            </IconButton>
            <h2 style={{ fontSize: "1.2rem", marginLeft: "10px" }}>
              {selectedLocation ? selectedLocation.name : ""}
            </h2>
          </Box>
          <h2 style={{ margin: "0 auto" }}>{title ? title : "အဝ စားမယ် "}</h2>
          {data ? (
            <Typography
              onClick={() => signOut({ callbackUrl: "/backoffice" })}
              sx={{ cursor: "pointer" }}
            >
              SignOut
            </Typography>
          ) : (
            <span></span>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={showNavigation}
        onClose={() => setShowNavigation(false)}
        disablePortal
      >
        <List>
          {sidebarMenuItems.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              href={item.route}
              style={{ textDecoration: "none", color: "#313131" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {sidebarMenuItems.slice(-1).map((item) => (
            <Link
              key={item.id}
              href={item.route}
              style={{ textDecoration: "none", color: "#313131" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
export default MenuAppBar;
