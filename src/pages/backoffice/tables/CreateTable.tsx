import { config } from "@/config/config";
import { useAppDispatch } from "@/store/hooks";
import { addTable } from "@/store/slices/tablesSlice";
import { getLocationId } from "@/utils";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const CreateTable = ({ open, setOpen }: Props) => {
  const selectedLocationId = getLocationId();
  const dispatch = useAppDispatch();

  const [newTable, setNewTable] = useState({
    name: "",
    locationId: selectedLocationId,
  });

  const createNewTable = async () => {
    const isValid = newTable.name;
    if (!isValid) return alert("Please enter table name");
    const response = await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTable),
    });
    const data = await response.json();
    dispatch(addTable(data));
    setNewTable({ name: "", locationId: selectedLocationId });
    setOpen(false);
    toast.success("New Table has been created!");
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create new table</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 300,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          sx={{ mt: 1 }}
          onChange={(evt) =>
            setNewTable({
              ...newTable,
              name: evt.target.value,
            })
          }
        />
        <Button
          variant="contained"
          onClick={createNewTable}
          sx={{
            width: "fit-content",
            alignSelf: "flex-end",
            mt: 2,
          }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTable;
