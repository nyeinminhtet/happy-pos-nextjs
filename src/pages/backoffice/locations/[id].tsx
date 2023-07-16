import { BackofficeContext } from "@/Contents/BackofficeContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { locations as Location } from "@prisma/client";
import { config } from "@/config/config";
import Layout from "@/Components/Layout";
import { Box, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/Components/DeleteDialog";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const EditLocation = () => {
  const router = useRouter();
  const locationId = router.query.id as string;
  const [open, setOpen] = useState(false);
  const { locations } = useAppSelector(appData);
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    if (locations.length) {
      const validLocation = locations.find(
        (item) => item.id === Number(locationId)
      );
      setLocation(validLocation);
    }
  }, [locations, locationId]);

  //upload locations
  const uploadLocation = async () => {
    const isValid = location && location.name && location.address;
    if (!isValid) return alert("Please fill fully form!");
    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(location),
    });
    // fetchData();
    router.back();
  };

  //delete location
  const deleteLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations?id=${locationId}`, {
      method: "DELETE",
    });
    // fetchData();
    setOpen(false);
    router.back();
  };

  console.log(location, "######");
  if (!location) return null;
  return (
    <Layout title="Edit Location">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          defaultValue={location?.name}
          sx={{ mb: 2, maxWidth: 350 }}
          onChange={(evt) =>
            location && setLocation({ ...location, name: evt.target.value })
          }
        />
        <TextField
          defaultValue={location?.address}
          sx={{ mb: 2, maxWidth: 350 }}
          onChange={(evt) =>
            location && setLocation({ ...location, address: evt.target.value })
          }
        />
        <Button
          variant="contained"
          onClick={uploadLocation}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Location"
        deleteFun={deleteLocation}
      />
    </Layout>
  );
};

export default EditLocation;
