import { useContext, useEffect, useState } from "react";

import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import { useRouter } from "next/router";
import Layout from "@/Components/Layout";
import { config } from "@/config/config";
import { getLocationId } from "@/utils";

const MenuDetails = () => {
  const { menus, menuCategories, menuMenuCategoriesLocations, fetchData } =
    useContext(BackofficeContext);
  const router = useRouter();

  const menuId = router.query.id as string;
  const selectedLocationId = getLocationId() as string;

  const validMenuCategoryIds = menuMenuCategoriesLocations
    .filter((item) => item.location_id === parseInt(selectedLocationId, 10))
    .map((item) => item.menu_categories_id);

  const mappedMenuCategories = menuCategories
    .filter((item) => item.id && validMenuCategoryIds.includes(item.id))
    .map((menuCategory) => ({
      id: menuCategory.id,
      label: menuCategory.category,
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
  });

  const selectedMenuCategories = menuCategories
    .filter((item) => menuCategoryIds.includes(item.id))
    .map((item) => ({ id: item.id, label: item.category }));

  const [selected, setSelected] = useState(selectedMenuCategories);
  // useEffect(() => {
  //   if (menu) {
  //     setNewMenu({ name: menu.name, price: menu.price });
  //   }
  // }, [menu]);

  //update
  const updateMenu = async () => {
    const response = await fetch(`${config.apiBackofficeBaseUrl}/menus`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenu),
    });
    console.log(await response.json());
    fetchData();
  };

  if (!menu) return null;

  return (
    <Layout title="Menu-Details">
      {menu ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          mt={5}
        >
          <TextField
            sx={{ minWidth: "400px", mb: 4 }}
            id="filled-basic"
            label="Name"
            variant="filled"
            defaultValue={menu.name}
            onChange={(evt) =>
              setNewMenu({ ...newMenu, name: evt.target.value })
            }
          />
          <TextField
            sx={{ minWidth: "400px", mb: 3 }}
            id="filled-basic"
            label="Price"
            defaultValue={menu.price}
            type="number"
            variant="filled"
            onChange={(evt) =>
              setNewMenu({ ...newMenu, price: parseInt(evt.target.value, 10) })
            }
          />
          <Autocomplete
            disablePortal
            multiple
            id="combo-box-demo"
            value={selected}
            options={mappedMenuCategories}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, v) => {
              const menuCategories = v.map((item) => item.id);
              setNewMenu({ ...newMenu, menuCategoryIds: menuCategories });
              setSelected(v);
            }}
            sx={{ width: 300, mb: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Menu-Categories" />
            )}
          />
          <Button variant="contained" onClick={updateMenu}>
            UPDATE
          </Button>
        </Box>
      ) : (
        "menu not found"
      )}
    </Layout>
  );
};

export default MenuDetails;
