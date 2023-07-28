import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import { signOut, useSession } from "next-auth/react";
import { getLocationId } from "@/utils";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { useRouter } from "next/router";

interface Props {
  title?: string;
}

const TopBar = ({ title = "" }: Props) => {
  const { data } = useSession();
  const locationId = getLocationId() as string;
  const { locations } = useAppSelector(appData);
  const selectedLocation = locations.find(
    (location) => location.id === Number(locationId)
  );
  const router = useRouter();

  const getTitle = () => {
    const pathname = router.pathname;
    if (pathname.includes("orders")) return "Orders";
    if (pathname.includes("menucategories")) return "Menu Categories";
    if (pathname.includes("menus")) return "Menus";
    if (pathname.includes("addoncategories")) return "Adddon Categories";
    if (pathname.includes("addons")) return "Addons";
    if (pathname.includes("tables")) return "Tables";
    if (pathname.includes("locations")) return "Locations";
    if (pathname.includes("settings")) return "Settings";
    return "";
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            background: "#00235B",
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.5rem", mb: 0 }}>
                  Sarr-Mal
                </Typography>

                <Typography sx={{ color: "gray" }}>
                  {selectedLocation ? selectedLocation.name : ""}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  {getTitle()}
                </Typography>
              </Box>
              <Button
                variant="text"
                onClick={() => signOut()}
                sx={{ color: "white" }}
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
              Sarr-Mal
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default TopBar;
