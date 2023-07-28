import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAddonCategory } from "@/store/slices/addonCategoriesSlice";
import { appData } from "@/store/slices/appSlice";
import { fetchMenusAddonCategories } from "@/store/slices/menusAddonCategoriesSlice";
import { getLocationId } from "@/utils";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NewAddonCategory = ({ open, setOpen }: Props) => {
  const { menusMenuCategoriesLocations, menus } = useAppSelector(appData);

  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    menuIds: [] as number[],
  });

  const dispatch = useAppDispatch();

  const disableButton =
    !newAddonCategory.name && !newAddonCategory.menuIds.length;
  const selectedLocationId = getLocationId() as string;

  //get menus from locations
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.location_id === Number(selectedLocationId))
    .map((item) => item.menu_id as number);
  const validMenus = menus.filter((item) => validMenuIds.includes(item.id));

  //create category
  const createAddonCategory = async () => {
    if (!newAddonCategory?.name || !newAddonCategory.menuIds.length)
      return alert("Please fill completely Form for new!");
    const response = await fetch(`${config.apiBaseUrl}/addoncategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddonCategory),
    });
    // fetchData();
    setOpen(false);
    const AddonCategoryCreate = await response.json();
    dispatch(addAddonCategory(AddonCategoryCreate));
    dispatch(fetchMenusAddonCategories(validMenuIds));
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create new menu category</DialogTitle>
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
          onChange={(evt) =>
            setNewAddonCategory({
              ...newAddonCategory,
              name: evt.target.value,
            })
          }
        />
        <FormControl sx={{ m: 1, ml: 0, width: 300 }}>
          <InputLabel id="select-menu-category">menus</InputLabel>
          <Select
            label="menu"
            multiple
            value={newAddonCategory.menuIds}
            input={<OutlinedInput label="menus" />}
            onChange={(v) => {
              const value = v.target.value as number[];
              setNewAddonCategory({
                ...newAddonCategory,
                menuIds: value,
              });
            }}
            renderValue={(value) => {
              const selectedMenuIds = newAddonCategory.menuIds.map((menuId) => {
                return validMenus.find((menu) => menu.id === menuId);
              });
              return selectedMenuIds
                .map((selectedMenu) => selectedMenu?.name)
                .join(", ");
            }}
            MenuProps={MenuProps}
          >
            {validMenus.map((menu) => (
              <MenuItem key={menu.id} value={menu.id}>
                <Checkbox
                  checked={
                    menu.id && newAddonCategory.menuIds.includes(menu.id)
                      ? true
                      : false
                  }
                />
                <ListItemText primary={menu.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          disabled={disableButton}
          onClick={createAddonCategory}
          sx={{
            width: "fit-content",
            alignSelf: "flex-end",
          }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddonCategory;
