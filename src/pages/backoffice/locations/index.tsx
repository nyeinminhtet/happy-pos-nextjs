import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { locations as Locations } from "@prisma/client";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import Layout from "@/Components/backoffice/BackofficeLayout";
import NewLocation from "./NewLocation";
import ItemCart from "@/Components/backoffice/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import Loading from "@/Components/Loading";

const LocationsComp = () => {
  const { locations, isLoading } = useAppSelector(appData);
  const [open, setOpen] = useState(false);

  const [updateLocations, setUpdateLocations] =
    useState<Locations[]>(locations);

  useEffect(() => {
    setUpdateLocations(locations);
  }, [locations]);

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{
            width: "fit-content",
            color: "#E8F6EF",
            mb: 2,
            mt: { xs: -3, sm: -2, md: 0 },
          }}
        >
          <AddIcon />
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
    </Box>
  );
};

export default LocationsComp;
