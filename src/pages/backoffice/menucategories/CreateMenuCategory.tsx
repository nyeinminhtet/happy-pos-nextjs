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
import { LoadingButton } from "@mui/lab";
import { config } from "@/config/config";
import { useState, useContext } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { addMenuCategory } from "@/store/slices/menuCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import { getLocationId } from "@/utils";

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

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateMenuCategory = ({ open, setOpen }: Props) => {
  const [newMenuCategory, setNewMenuCat] = useState({
    category: "",
    locationIds: [] as number[],
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { locations } = useAppSelector(appData);
  const isDisable =
    !newMenuCategory.category && !newMenuCategory.locationIds.length;
  const selectedLocation = getLocationId() as string;

  //create category
  const createMenuCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${config.apiBaseUrl}/menucategories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMenuCategory),
      });
      // fetchData();
      const menuCategroyCreated = await response.json();

      dispatch(addMenuCategory(menuCategroyCreated));
      dispatch(fetchMenusMenuCategoriesLocations(selectedLocation));
      setLoading(false);
      setOpen(false);
      setNewMenuCat({ category: "", locationIds: [] });
    } catch (error) {
      console.log(error);
      setNewMenuCat({ category: "", locationIds: [] });
    }
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
            setNewMenuCat({ ...newMenuCategory, category: evt.target.value })
          }
        />
        <FormControl sx={{ my: 1, width: 300 }}>
          <InputLabel id="select-menu-category">Locations</InputLabel>
          <Select
            label="locations"
            multiple
            value={newMenuCategory.locationIds}
            input={<OutlinedInput label="locations" />}
            onChange={(v) => {
              const value = v.target.value as number[];
              setNewMenuCat({ ...newMenuCategory, locationIds: value });
            }}
            renderValue={(value) => {
              const selectedLocations = newMenuCategory.locationIds.map(
                (locationId) => {
                  return locations.find(
                    (location) => location.id === locationId
                  );
                }
              );
              return selectedLocations
                .map((selectedLocation) => selectedLocation?.name)
                .join(", ");
            }}
            MenuProps={MenuProps}
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                <Checkbox
                  checked={
                    location.id &&
                    newMenuCategory.locationIds.includes(location.id)
                      ? true
                      : false
                  }
                />
                <ListItemText primary={location.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LoadingButton
          onClick={createMenuCategory}
          disabled={isDisable}
          variant="contained"
          sx={{
            width: "fit-content",
            alignSelf: "flex-end",
            bgcolor: "#820000",
            color: "white",
            ":hover": { bgcolor: "#820000" },
          }}
        >
          Create
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMenuCategory;
