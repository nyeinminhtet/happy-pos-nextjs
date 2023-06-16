import { useContext, useEffect, useState } from "react";

import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import { useRouter } from "next/router";
import Layout from "@/Components/Layout";
import { config } from "@/config/config";
import {
  getAddonCategoryByMenuId,
  getLocationId,
  getMenuCategoryIdByLocationId,
} from "@/utils";

interface AutocompleteProps {
  id: number;
  label: string;
}

const MenuDetails = () => {
  const {
    menus,
    menuCategories,
    menuMenuCategoriesLocations,
    fetchData,
    addonCategories,
    menuAddons,
  } = useContext(BackofficeContext);
  const router = useRouter();
  const menuId = router.query.id as string;
  const selectedLocationId = getLocationId() as string;

  const validMenuCategory = getMenuCategoryIdByLocationId(
    menuCategories,
    selectedLocationId,
    menuMenuCategoriesLocations
  ).map((item) => ({ id: item.id, label: item.category }));

  const mappedAddonCategories = addonCategories.map((item) => ({
    id: item.id,
    label: item.name,
  }));

  const menuCategoryIds = menuMenuCategoriesLocations
    .filter((item) => item.menu_id === Number(menuId))
    .map((item) => item.menu_categories_id);

  const menu = menus.find((menu) => menu.id === parseInt(menuId, 10));
  const [newMenu, setNewMenu] = useState({
    id: parseInt(menuId, 10),
    name: menu?.name,
    price: menu?.price,
    menuCategoryIds,
    locationId: selectedLocationId,
    addonCategoryIds: [] as number[],
  });

  const selectedMenuCategories = menuCategories
    .filter((item) => menuCategoryIds.includes(item.id))
    .map((item) => ({ id: item.id, label: item.category }));

  const validAddonCategory = getAddonCategoryByMenuId(
    addonCategories,
    menuId,
    menuAddons
  ).map((item) => ({ id: item.id, label: item.name }));

  const [connectedMenuCategories, setConnectedMenuCategories] =
    useState<AutocompleteProps[]>();
  const [connectedAddonCategories, setConnectedAddonCategories] =
    useState<AutocompleteProps[]>();

  //update
  const updateMenu = async () => {
    const response = await fetch(`${config.apiBackofficeBaseUrl}/menus`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenu),
    });
    router.back();
    fetchData();
  };

  if (!menu) return null;

  return (
    <Layout title="Menu-Details">
      {menu ? (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ mb: 2, width: "50%" }}
            label="Name"
            defaultValue={menu.name}
            onChange={(evt) =>
              setNewMenu({ ...newMenu, name: evt.target.value })
            }
          />
          <TextField
            sx={{ mb: 2, width: "50%" }}
            label="Price"
            defaultValue={menu.price}
            type="number"
            onChange={(evt) =>
              setNewMenu({ ...newMenu, price: parseInt(evt.target.value, 10) })
            }
          />
          <Autocomplete
            disablePortal
            multiple
            id="combo-box-demo"
            value={selectedMenuCategories}
            options={validMenuCategory}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, v) => {
              const menuCategoryIds = v.map((item) => item.id);
              setNewMenu({ ...newMenu, menuCategoryIds });
              setConnectedMenuCategories(v);
            }}
            sx={{ width: 500, mb: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Menu-Categories" />
            )}
          />
          <Autocomplete
            disablePortal
            multiple
            options={mappedAddonCategories}
            value={validAddonCategory}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, v) => {
              const addonCategoryIds = v.map((item) => item.id);
              setNewMenu({ ...newMenu, addonCategoryIds });
              setConnectedAddonCategories(v);
            }}
            sx={{ width: 500, mb: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Addon-Categories" />
            )}
          />
          <Button
            variant="contained"
            onClick={updateMenu}
            sx={{ width: "fit-content", mt: 3 }}
          >
            Update
          </Button>
        </Box>
      ) : (
        "menu not found"
      )}
    </Layout>
  );
};

export default MenuDetails;
