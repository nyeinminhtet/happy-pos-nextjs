import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addLocation } from "@/store/slices/LocationsSlice";
import { appData } from "@/store/slices/appSlice";
import {
  Dialog,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewLocation: React.FC<Props> = ({ open, setOpen }) => {
  const { company } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });

  //create location
  const createLocation = async () => {
    const isValid = newLocation.name && newLocation.address;
    if (!isValid) return alert("Name and address are required");
    newLocation.companyId = company?.id;
    try {
      const response = await fetch(`${config.apiBaseUrl}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLocation),
      });
      const locationCreate = await response.json();
      dispatch(addLocation(locationCreate));
      setOpen(false);
      setNewLocation({ name: "", address: "", companyId: company?.id });
      toast.success("New location has been created!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create new location</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 300,
          minHeight: 150,
          mb: 1,
        }}
      >
        <TextField
          value={newLocation.name}
          placeholder="Name"
          sx={{ mb: 3 }}
          onChange={(e) =>
            setNewLocation({ ...newLocation, name: e.target.value })
          }
        />
        <TextField
          value={newLocation.address}
          placeholder="Address"
          sx={{ mb: 3, minWidth: 300 }}
          onChange={(evt) => {
            setNewLocation({ ...newLocation, address: evt.target.value });
          }}
        />
        <Button variant="contained" onClick={createLocation}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewLocation;
