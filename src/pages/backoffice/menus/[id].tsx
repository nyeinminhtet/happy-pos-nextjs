import { useEffect, useState } from "react";

import { Autocomplete, Box, Button, Checkbox, TextField } from "@mui/material";
import { useRouter } from "next/router";
import Layout from "@/Components/BackofficeLayout";
import { config } from "@/config/config";
import {
  getAddonCategoryByMenuId,
  getLocationId,
  getMenuCategoryIdByLocationId,
} from "@/utils";
import {
  menus as Menu,
  addon_categories as AddonCategory,
} from "@prisma/client";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/Components/DeleteDialog";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { removeMenu, updateMenu } from "@/store/slices/menusSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import Loading from "@/Components/Loading";
import { toast } from "react-toastify";

const MenuDetails = () => {
  const { menus, addonCategories, menuAddons, isLoading } =
    useAppSelector(appData);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const menuId = router.query.id as string;

  const selectedLocationId = getLocationId() as string;
  const [open, setOpen] = useState(false);

  const mappedAddonCategories = addonCategories.map((item) => ({
    id: item.id,
    label: item.name,
  }));

  const menu = menus.find((menu) => menu.id === parseInt(menuId, 10)) as Menu;

  const [newMenu, setNewMenu] = useState({
    id: "",
    name: "",
    price: 0,
    addonCategoryIds: [] as number[],
  });

  useEffect(() => {
    menu &&
      setNewMenu({
        id: menuId,
        name: menu.name,
        price: menu.price,
        addonCategoryIds: [],
      });
  }, [menu, menuId]);

  const selectedAddonCategories = getAddonCategoryByMenuId(
    addonCategories,
    menuId,
    menuAddons
  ).map((item) => ({ id: item.id, label: item.name }));

  //update
  const handleUpdateMenu = async () => {
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenu),
    });
    const updatedMenu = await response.json();
    dispatch(updateMenu(updatedMenu));
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    router.back();
    toast.success("Menu has been updated!");
  };

  //delete menu || archive
  const deleteMenu = async () => {
    await fetch(`${config.apiBaseUrl}/menus?id=${menuId}`, {
      method: "DELETE",
    });
    // fetchData();
    dispatch(removeMenu(menu));
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));

    setOpen(false);
    router.back();
    toast.success("Menu has been deleted!");
  };

  if (isLoading) return <Loading />;
  if (!menu) return null;

  return (
    <Box>
      <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: { xs: -5, md: 0 },
            mr: { xs: -2, sm: -5, md: 0 },
            mb: { xs: 5, sm: 0 },
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{ backgroundColor: "#E21818" }}
          >
            Delete
          </Button>
        </Box>
        <TextField
          sx={{ mb: 2, width: { xs: "100%", sm: "70%" } }}
          label="Name"
          defaultValue={menu.name}
          onChange={(evt) => setNewMenu({ ...newMenu, name: evt.target.value })}
        />
        <TextField
          sx={{ mb: 2, width: { xs: "100%", sm: "70%" } }}
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
          options={mappedAddonCategories}
          defaultValue={selectedAddonCategories}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(e, v) => {
            const addonCategoryIds = v.map((item) => item.id);
            setNewMenu({ ...newMenu, addonCategoryIds });
          }}
          sx={{ maxWidth: { xs: 300, sm: 400, md: 500 }, mb: { md: 3 } }}
          renderInput={(params) => (
            <TextField {...params} label="Addon-Categories" />
          )}
        />
        <Button
          variant="contained"
          onClick={handleUpdateMenu}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="menu"
        deleteFun={deleteMenu}
      />
    </Box>
  );
};

export default MenuDetails;
