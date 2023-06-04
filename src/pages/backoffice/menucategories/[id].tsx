import Layout from "@/Components/Layout";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import { Autocomplete, Box, Button, Checkbox, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  locations as Location,
  menu_categories as MenuCategory,
} from "@prisma/client";
import { config } from "@/config/config";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const EditMenuCategories = () => {
  const route = useRouter();
  const menuCategoryId = route.query.id as string;
  const { menuCategories, locations, menuMenuCategoriesLocations } =
    useContext(BackofficeContext);
  const menuCategory = menuCategories.find(
    (item) => item.id === parseInt(menuCategoryId, 10)
  );

  const menuIds = menuMenuCategoriesLocations
    .filter((item) => item.menu_categories_id === Number(menuCategoryId))
    .map((item) => item.menu_id);

  const locationIds = menuMenuCategoriesLocations
    .filter((item) => item.menu_categories_id === menuCategory?.id)
    .map((item) => item.location_id);

  const selectedLocations = locations.filter((location) =>
    locationIds.includes(location.id)
  );
  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    category: menuCategory?.category,
    locations: selectedLocations,
    menuIds,
  });

  // useEffect(() => {
  //   if (menuCategory) {
  //     setNewMenuCategory({
  //       ...newMenuCategory,
  //       category: menuCategory.category,
  //       locations: selectedLocations,
  //     });
  //   }
  // }, []);

  const updateMenuCategory = async () => {
    await fetch(`${config.apiBackofficeBaseUrl}/menu-categories`, {
      method: "PUT",
      body: JSON.stringify(newMenuCategory),
    });
  };

  if (!menuCategory) return null;
  return (
    <Layout title="Edit menu category">
      <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
        <TextField defaultValue={menuCategory.category} sx={{ mb: 2 }} />
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={locations}
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
          renderInput={(params) => <TextField {...params} label="locations" />}
        />
        <Button
          variant="contained"
          onClick={updateMenuCategory}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditMenuCategories;
