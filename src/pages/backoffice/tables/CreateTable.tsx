import { config } from "@/config/config";
import { getLocationId } from "@/utils";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const CreateTable = ({ open, setOpen }: Props) => {
  const selectedLocationId = getLocationId();

  const [newTable, setNewTable] = useState({
    name: "",
    locationId: selectedLocationId,
  });

  const createNewTable = async () => {
    const isValid = newTable.name;
    if (!isValid) return alert("Please enter table name");
    await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTable),
    });
    // fetchData();
    setNewTable({ name: "", locationId: selectedLocationId });
    setOpen(false);
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
            bgcolor: "#820000",
            ":hover": { bgcolor: "#820000" },
          }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTable;
