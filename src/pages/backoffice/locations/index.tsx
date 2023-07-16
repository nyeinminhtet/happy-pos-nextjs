import { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { locations as Locations } from "@prisma/client";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import Layout from "@/Components/Layout";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import NewLocation from "./NewLocation";
import ItemCart from "@/Components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const LocationsComp = () => {
  const { locations, company } = useAppSelector(appData);
  const [open, setOpen] = useState(false);

  const [updateLocations, setUpdateLocations] =
    useState<Locations[]>(locations);

  useEffect(() => {
    setUpdateLocations(locations);
  }, [locations]);

  return (
    <Layout title="Locations">
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
          New menu location
        </Button>
      </Box>
      <Box sx={{ mt: 5, px: 5, display: "flex", flexWrap: "wrap" }}>
        {updateLocations.map((location, index) => {
          return (
            <ItemCart
              key={index}
              href={`/backoffice/locations/${location.id}`}
              icon={<EditLocationAltIcon sx={{ fontSize: 30 }} />}
              title={location.name}
            />
          );
        })}
      </Box>
      <NewLocation open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default LocationsComp;
