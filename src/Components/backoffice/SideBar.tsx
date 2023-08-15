import Link from "next/link";
import { useState } from "react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TableBarIcon from "@mui/icons-material/TableBar";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { useRouter } from "next/router";

const SideBar = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <Box
        sx={{
          minWidth: { xs: 150, sm: 200, md: 250 },
          background: "#00235B",
          border: "1px solid white",
        }}
      >
        <List sx={{ p: 0 }}>
          {sidebarMenuItems.slice(0, 7).map((item) => (
            <Link
              key={item.id}
              href={item.route}
              style={{ textDecoration: "none", color: "#FFB100" }}
            >
              <ListItem
                disablePadding
                sx={{
                  ":hover": {
                    background: "#4E6C50",
                  },
                  bgcolor: router.pathname.includes(item.route)
                    ? "#4E6C50"
                    : "",
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "white",
                      mr: { xs: -3, md: 0 },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      color: "white",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider
          variant={"middle"}
          sx={{ backgroundColor: "#FFE194", mt: 2 }}
        />
        <List>
          {sidebarMenuItems.slice(-1).map((item) => (
            <Link
              key={item.id}
              href={item.route}
              style={{ textDecoration: "none", color: "#313131" }}
            >
              <ListItem
                disablePadding
                sx={{
                  ":hover": {
                    background: "#4E6C50",
                    bgcolor: router.pathname.includes(item.route)
                      ? "#4E6C50"
                      : "",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "white",
                      mr: { xs: -3, md: 0 },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} sx={{ color: "white" }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;

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
    icon: <LocalPizzaIcon />,
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
    label: "Tables",
    icon: <TableBarIcon />,
    route: "/backoffice/tables",
  },
  {
    id: 8,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
  },
];
