import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAddon } from "@/store/slices/addonsSlice";
import { appData } from "@/store/slices/appSlice";
import { getAddonCategoryByLocation, getLocationId } from "@/utils";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const NewAddon = ({ open, setOpen }: Props) => {
  const { addonCategories, menuAddons, menuMenuCategoriesLocations } =
    useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: "",
  });
  const selectedLocationId = getLocationId() as string;

  const isDisable = !newAddon.name && !newAddon.price;

  const validAddonCategoryIds = getAddonCategoryByLocation(
    menuMenuCategoriesLocations,
    menuAddons,
    selectedLocationId
  );

  const validAddonCategories = addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );

  //create addon
  const createAddon = async () => {
    setOpen(false);
    const response = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddon),
    });
    setNewAddon({ name: "", price: 0, addonCategoryId: "" });
    const createAddon = await response.json();
    //fetchData();
    dispatch(addAddon(createAddon));
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create new addon</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 300,
          minHeight: 150,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          sx={{ my: 2 }}
          onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
        />
        <TextField
          label="price"
          type="number"
          variant="outlined"
          sx={{ my: 2 }}
          onChange={(e) =>
            setNewAddon({ ...newAddon, price: Number(e.target.value) })
          }
        />
        <FormControl sx={{ m: "1rem 0", minWidth: 120 }} size="medium">
          <InputLabel id="demo-select-small-label">AddonCategory</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={newAddon.addonCategoryId}
            label="AddonCategory"
            onChange={(e) => {
              setNewAddon({ ...newAddon, addonCategoryId: e.target.value });
            }}
          >
            {validAddonCategories.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          disabled={isDisable}
          onClick={createAddon}
          sx={{
            width: "fit-content",
            alignSelf: "flex-end",
            bgcolor: "#820000",
            color: "white",
            ":hover": {
              bgcolor: "#820000",
            },
          }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddon;
