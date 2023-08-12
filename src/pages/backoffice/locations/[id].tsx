import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { locations as Location } from "@prisma/client";
import { config } from "@/config/config";
import Layout from "@/Components/BackofficeLayout";
import { Box, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/Components/DeleteDialog";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { removeLocation, updateLocation } from "@/store/slices/LocationsSlice";
import Loading from "@/Components/Loading";
import { toast } from "react-toastify";

const EditLocation = () => {
  const router = useRouter();
  const locationId = router.query.id as string;
  const [open, setOpen] = useState(false);
  const { locations, isLoading } = useAppSelector(appData);
  const [location, setLocation] = useState<Location>();
  const dispatch = useAppDispatch();

  const validLocation = locations.find(
    (item) => item.id === Number(locationId)
  ) as Location;
  useEffect(() => {
    if (locations.length) {
      setLocation(validLocation);
    }
  }, [locations, , validLocation]);

  //upload locations
  const uploadLocation = async () => {
    const isValid = location && location.name && location.address;
    if (!isValid) return alert("Please fill fully form!");
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(location),
    });
    if (response.ok) {
      const locationUpdate = await response.json();
      dispatch(updateLocation(locationUpdate));
      router.back();
      toast.success("Location has been successfully updated!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  //delete location
  const deleteLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations?id=${locationId}`, {
      method: "DELETE",
    });
    dispatch(removeLocation(validLocation));
    setOpen(false);
    router.back();
    toast.success("Loaction has been successfully deleted!");
  };

  if (isLoading) return <Loading />;
  if (!location) return null;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          mt: { xs: -3, sm: -2, md: 0 },
        }}
      >
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
          sx={{ mb: 2, maxWidth: { xs: 250, md: 350 } }}
          onChange={(evt) =>
            location && setLocation({ ...location, name: evt.target.value })
          }
        />
        <TextField
          defaultValue={location?.address}
          sx={{ mb: 2, maxWidth: { xs: 250, md: 350 } }}
          onChange={(evt) =>
            location && setLocation({ ...location, address: evt.target.value })
          }
        />
        <Button
          variant="contained"
          onClick={uploadLocation}
          sx={{ width: "fit-content", mt: { xs: 1, md: 3 } }}
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
    </Box>
  );
};

export default EditLocation;
