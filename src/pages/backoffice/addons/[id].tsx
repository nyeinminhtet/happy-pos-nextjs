import Layout from "@/Components/Layout";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import { config } from "@/config/config";
import { getLocationId, getMenusIdFromMenuMenuCategoryLocation } from "@/utils";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { addon_categories } from "@prisma/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const EditAddon = () => {
  const router = useRouter();
  const addonId = router.query.id as string;
  const selectedLocationId = getLocationId() as string;
  const {
    addons,
    menuMenuCategoriesLocations,
    menuAddons,
    addonCategories,
    fetchData,
  } = useContext(BackofficeContext);

  const addon = addons.find((addon) => addon.id === parseInt(addonId, 10));

  //get menuId from menulocatios
  const locationMenuIds = getMenusIdFromMenuMenuCategoryLocation(
    selectedLocationId,
    menuMenuCategoriesLocations
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

  const [selected, setSelected] = useState(selectedAddonCategory);

  console.log(addonId);
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
  }, [addon]);

  const updateAddon = async () => {
    try {
      await fetch(`${config.apiBackofficeBaseUrl}/addons`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddon),
      });
      fetchData();
      router.back();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout title="Edit Addon">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {addon && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Name"
              sx={{ width: 350, mb: 2 }}
              defaultValue={addon.name}
              onChange={(e) =>
                setNewAddon({ ...newAddon, name: e.target.value })
              }
            />
            <TextField
              label="price"
              type="number"
              sx={{ width: 350 }}
              defaultValue={addon.price}
              onChange={(e) =>
                setNewAddon({ ...newAddon, price: Number(e.target.value) })
              }
            />
            <FormControl sx={{ m: 1, width: 350 }} size="medium">
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
          onClick={updateAddon}
          sx={{ width: "fit-content", mt: 2 }}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditAddon;
