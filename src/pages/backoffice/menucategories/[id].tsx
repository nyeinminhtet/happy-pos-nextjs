import Layout from "@/Components/Layout";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { menus as Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { config } from "@/config/config";
import {
  getLocationByMenuCategoryId,
  getLocationId,
  getMenusByLocationId,
} from "@/utils";
import MenuCard from "@/Components/MenuCard";
import RemoveMenuFromMenuCategory from "./RemoveMenu";
import DeleteDialog from "@/Components/DeleteDialog";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface AutocompleteProps {
  id: number;
  label: string;
}

const EditMenuCategories = () => {
  const route = useRouter();
  const menuCategoryId = route.query.id as string;
  const { menuCategories, locations, menuMenuCategoriesLocations, menus } =
    useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const [deletOpen, setDeleteOpne] = useState(false);
  const menuCategory = menuCategories.find(
    (item) => item.id === parseInt(menuCategoryId, 10)
  );
  const selectedlocation = getLocationId() as string;

  const menuIds = menuMenuCategoriesLocations
    .filter(
      (item) =>
        item.menu_categories_id === Number(menuCategoryId) &&
        item.location_id === Number(selectedlocation)
    )
    .map((item) => item.menu_id);

  const locationMenus = getMenusByLocationId(
    selectedlocation,
    menuMenuCategoriesLocations,
    menus
  );

  const validMenus = menus.filter((item) => menuIds.includes(item.id));
  const validLocations = getLocationByMenuCategoryId(
    locations,
    menuCategoryId,
    menuMenuCategoriesLocations
  );

  const [selectedMenu, setSelectedMenu] = useState<AutocompleteProps | null>(
    null
  );
  const [selectedMenuToRemove, setSelectedMenuToRemove] = useState<Menu>();

  const [newMenuCategory, setNewMenuCategory] = useState({
    id: parseInt(menuCategoryId, 10),
    category: menuCategory?.category,
    locations: validLocations,
    menuIds,
  });

  const updateMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menucategories`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenuCategory),
    });
    route.back();
    //  fetchData();
  };
  const handleRemoveMenu = (menu: Menu) => {
    setSelectedMenuToRemove(menu);
    setOpen(true);
  };

  const addMenuToCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menucategories/addMenu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        menuId: selectedMenu && selectedMenu.id,
        locationId: selectedlocation,
        menuCategoryId,
      }),
    });
    // fetchData();
    setSelectedMenu(null);
  };

  //delete || archive
  const deletefun = async () => {
    await fetch(`${config.apiBaseUrl}/menucategories?id=${menuCategoryId}`, {
      method: "DELETE",
    });
    // fetchData();
    setDeleteOpne(false);
    route.back();
  };

  if (!menuCategory) return null;
  return (
    <Layout title="menu category">
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setDeleteOpne(true)}
          variant="contained"
          sx={{
            backgroundColor: "#820000",
            ":hover": { bgcolor: "#820000" },
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
          <TextField
            defaultValue={menuCategory.category}
            sx={{ mb: 2 }}
            onChange={(v) =>
              setNewMenuCategory({
                ...newMenuCategory,
                category: v.target.value,
              })
            }
          />
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={locations}
            value={newMenuCategory.locations}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, v) =>
              setNewMenuCategory({ ...newMenuCategory, locations: v })
            }
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="locations" />
            )}
          />
        </Box>
        <Button
          variant="contained"
          onClick={updateMenuCategory}
          sx={{ width: "fit-content", m: "1.5rem 0" }}
        >
          Update
        </Button>
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Menus
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Autocomplete
            sx={{ minWidth: 300, mr: 3 }}
            value={selectedMenu}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(evt, value) => {
              setSelectedMenu(value);
            }}
            clearOnBlur
            options={locationMenus
              .filter((item) => !menuIds.includes(item.id))
              .map((item) => ({ id: item.id, label: item.name }))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add menu to this category"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <Button variant="contained" onClick={addMenuToCategory}>
            Add
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validMenus.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <MenuCard menu={item} href={`/backoffice/menus/${item.id}`} />
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{ width: "fit-content", mb: 2 }}
                onClick={() => handleRemoveMenu(item)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      <RemoveMenuFromMenuCategory
        open={open}
        setOpen={setOpen}
        menu={selectedMenuToRemove}
      />
      <DeleteDialog
        open={deletOpen}
        setOpen={setDeleteOpne}
        title="MenuCategory"
        deleteFun={deletefun}
      />
    </Layout>
  );
};

export default EditMenuCategories;
