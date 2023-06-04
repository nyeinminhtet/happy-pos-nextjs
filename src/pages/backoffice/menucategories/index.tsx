import { useContext, useState } from "react";

import {
  Box,
  TextField,
  Button,
  Chip,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";
import {
  menu_categories as MenuCategories,
  locations as Locations,
} from "@prisma/client";
import { config } from "@/config/config";
import Layout from "@/Components/Layout";
import { BackofficeContext } from "@/Contents/BackofficeContext";
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

const Menu_Categories = () => {
  const { menuCategories, fetchData, menuMenuCategoriesLocations, locations } =
    useContext(BackofficeContext);
  const selectedLocationId = getLocationId() as string;
  const [open, setOpen] = useState(false);

  const [newMenuCategory, setNewMenuCat] = useState({
    category: "",
    locationIds: [] as number[],
  });

  const validMenuCategoryIds = menuMenuCategoriesLocations
    .filter((item) => item.location_id === parseInt(selectedLocationId, 10))
    .map((item) => item.menu_categories_id);
  const filteredMenuCategories = menuCategories.filter(
    (item) => item.id && validMenuCategoryIds.includes(item.id)
  );

  const getMenuCount = (menuCategoryId?: number) => {
    if (!menuCategoryId) return 0;
    return menuMenuCategoriesLocations.filter(
      (item) => item.menu_categories_id === menuCategoryId && item.menu_id
    ).length;
  };

  //create category

  const createMenuCategory = async () => {
    if (!newMenuCategory?.category || !newMenuCategory.locationIds.length)
      return alert("pls fill completely!");
    const response = await fetch(
      `${config.apiBackofficeBaseUrl}/menu-categories`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMenuCategory),
      }
    );
    fetchData();
    setOpen(false);
  };

  //delete
  const handleDelete = async (id: any) => {
    const response = await fetch(
      `${config.apiBackofficeBaseUrl}/menu-categories/${id}`,
      {
        method: "DELETE",
      }
    );
    fetchData();
  };

  return (
    <Layout title="Menu-Categories">
      <Box>
        <Box sx={{ display: "flex" }}>
          <Box
            onClick={() => setOpen(true)}
            sx={{
              width: "170px",
              height: "170px",
              borderRadius: 2,
              border: "2px solid #EBEBEB",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              textAlign: "center",
              mr: 4,
            }}
          >
            <AddCircleOutlineIcon color="info" sx={{ fontSize: "50px" }} />
          </Box>
          {filteredMenuCategories.map((item, index) => (
            <Link
              key={index}
              href={`/backoffice/menucategories/${item.id}`}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <Box sx={{ textAlign: "center", mr: 4 }}>
                <Box
                  sx={{
                    width: "170px",
                    height: "170px",
                    borderRadius: 2,
                    border: "2px solid #EBEBEB",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <Typography>{getMenuCount(item.id)}menus</Typography>
                </Box>
                <Typography>{item.category}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
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
          <FormControl sx={{ m: 1, width: 300 }}>
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
          <Button
            variant="contained"
            onClick={createMenuCategory}
            sx={{ width: "fit-content", alignSelf: "flex-end" }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Menu_Categories;
