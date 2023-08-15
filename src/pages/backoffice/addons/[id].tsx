import Layout from "@/Components/backoffice/BackofficeLayout";
import { config } from "@/config/config";
import { getLocationId, getMenusIdFromMenuMenuCategoryLocation } from "@/utils";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteDialog from "@/Components/backoffice/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { removeAddon, updateAddon } from "@/store/slices/addonsSlice";
import { addons as Addon } from "@prisma/client";
import Loading from "@/Components/Loading";
import { toast } from "react-toastify";

const EditAddon = () => {
  const router = useRouter();
  const addonId = router.query.id as string;
  const selectedLocationId = getLocationId() as string;
  const dispatch = useAppDispatch();
  const {
    addons,
    menusMenuCategoriesLocations,
    menuAddons,
    addonCategories,
    isLoading,
  } = useAppSelector(appData);

  const addon = addons.find(
    (addon) => addon.id === parseInt(addonId, 10)
  ) as Addon;
  const [open, setOpen] = useState(false);
  //get menuId from menulocatios
  const locationMenuIds = getMenusIdFromMenuMenuCategoryLocation(
    selectedLocationId,
    menusMenuCategoriesLocations
  );

  const addoncategoryMenuIds = menuAddons
    .filter((item) => locationMenuIds.includes(item.menu_id))
    .map((item) => item.addon_category_id);

  const locationAddonCategories = addonCategories.filter((item) =>
    addoncategoryMenuIds.includes(item.id)
  );

  //selected addoncategory
  const selectedAddonCategory = addonCategories
    .filter((item) => addon && item.id === addon.addon_category_id)
    .map((item) => ({ id: item.id, label: item.name }));

  //update new addon
  const [newAddon, setNewAddon] = useState({
    id: Number(addonId),
    name: addon?.name,
    price: addon?.price,
    addonCategoryId: addon?.addon_category_id,
  });

  useEffect(() => {
    if (addon) {
      setNewAddon({
        id: Number(addonId),
        name: addon.name,
        price: addon.price,
        addonCategoryId: addon.addon_category_id,
      });
    }
  }, [addon, addonId]);

  const handleUpdateAddon = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/addons`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddon),
      });

      if (response.ok) {
        const addonnew = await response.json();
        dispatch(updateAddon(addonnew));
        router.back();
        toast.success("Addon has been successfully updated!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //delete || archive
  const deleteAddon = async () => {
    await fetch(`${config.apiBaseUrl}/addons?id=${addonId}`, {
      method: "DELETE",
    });
    // fetchData();
    dispatch(removeAddon(addon));
    setOpen(false);
    router.back();
    toast.success("Addon has been successfully deleted!");
  };

  if (isLoading) return <Loading />;
  if (!addon) return null;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: { xs: -3, sm: -2, md: 0 },
          mb: { xs: 2, md: 0 },
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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {addon && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Name"
              sx={{ maxWidth: { xs: 250, md: 350 }, mb: 2 }}
              defaultValue={addon.name}
              onChange={(e) =>
                setNewAddon({ ...newAddon, name: e.target.value })
              }
            />
            <TextField
              label="price"
              type="number"
              sx={{ maxWidth: { xs: 250, md: 350 } }}
              defaultValue={addon.price}
              onChange={(e) =>
                setNewAddon({ ...newAddon, price: Number(e.target.value) })
              }
            />
            <FormControl
              sx={{ mt: 2, maxWidth: { xs: 250, md: 350 } }}
              size="medium"
            >
              <InputLabel id="demo-select-small-label">
                AddonCategory
              </InputLabel>
              <Select
                label="AddonCategory"
                defaultValue={addon.addon_category_id}
                onChange={(e) => {
                  setNewAddon({
                    ...newAddon,
                    addonCategoryId: Number(e.target.value),
                  });
                }}
              >
                {locationAddonCategories.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        )}

        <Button
          variant="contained"
          onClick={handleUpdateAddon}
          sx={{ width: "fit-content", mt: 2 }}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Addon"
        deleteFun={deleteAddon}
      />
    </Box>
  );
};

export default EditAddon;
