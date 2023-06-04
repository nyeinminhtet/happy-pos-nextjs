import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuAppBar, { sidebarMenuItems } from "./AppBar";

type Props = {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
};

const Layout = (props: Props) => {
  return (
    <div>
      <MenuAppBar />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            minWidth: 250,
            background: "#820000",
            border: "1px solid white",
          }}
        >
          <List sx={{ p: 0 }}>
            {sidebarMenuItems.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                href={item.route}
                style={{ textDecoration: "none", color: "#FFB100" }}
              >
                <ListItem
                  disablePadding
                  sx={{ "&.hover": { backgroundColor: "#FFB100" } }}
                >
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "black" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{ color: "white" }}
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
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "#E8F6EF" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{ color: "#E8F6EF" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
        <Box sx={{ p: 3 }}>{props.children}</Box>
      </Box>
    </div>
  );
};

export default Layout;
