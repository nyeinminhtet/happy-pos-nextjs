import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import { signOut, useSession } from "next-auth/react";
import { getLocationId } from "@/utils";
import { BackofficeContext } from "@/Contents/BackofficeContext";

interface Props {
  title?: string;
}

const TopBar = ({ title = "" }: Props) => {
  const { data } = useSession();
  const locationId = getLocationId() as string;
  const { locations } = useContext(BackofficeContext);
  const selectedLocation = locations.find(
    (location) => location.id === Number(locationId)
  );
  return (
    <Box>
      <AppBar position="sticky">
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.5rem", mb: 0 }}>
                  Sarr-Mell
                </Typography>

                <Typography sx={{ color: "lightcoral" }}>
                  {selectedLocation ? selectedLocation.name : ""}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  {title}
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
              Sarr-Mell
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default TopBar;
