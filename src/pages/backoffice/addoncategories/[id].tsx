import Layout from "@/Components/Layout";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  locations as Location,
  menu_categories as MenuCategory,
  menus as Menu,
} from "@prisma/client";
import { config } from "@/config/config";
import {
  getLocationId,
  getMenusByLocationId,
  getMenusIdFromMenuMenuCategoryLocation,
} from "@/utils";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const EditAddonCategories = () => {
  const route = useRouter();
  const addonCategoryId = route.query.id as string;
  const selectedLocationId = getLocationId() as string;
  const {
    addonCategories,
    menus,
    menuMenuCategoriesLocations,
    menuAddons,
    fetchData,
  } = useContext(BackofficeContext);
  const addonCategory = addonCategories.find(
    (item) => item.id === parseInt(addonCategoryId, 10)
  );

  //get menus from location
  const locationMenus = getMenusByLocationId(
    selectedLocationId,
    menuMenuCategoriesLocations,
    menus
  ).map((item) => ({ id: item.id, label: item.name }));

  //get menu from addonMenus
  const selectedMenuIds = menuAddons
    .filter((item) => item.addon_category_id === Number(addonCategoryId))
    .map((item) => item.menu_id);

  const selectedMenus = menus
    .filter((item) => selectedMenuIds.includes(item.id))
    .map((item) => ({ id: item.id, label: item.name }));

  const [newAddonCategory, setNewAddonCategory] = useState({
    id: Number(addonCategoryId),
    name: addonCategory?.name,
    menuIds: selectedMenuIds,
    isRequire: addonCategory?.is_require,
  });

  //to connect with menus
  const [connectedMenus, setConnectedMenus] = useState(selectedMenus);

  const updateAddonCategory = async () => {
    await fetch(`${config.apiBackofficeBaseUrl}/addoncategories`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddonCategory),
    });
    fetchData();
    route.back();
  };
  if (!addonCategory) return null;
  return (
    <Layout title="Edit addon category">
      <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
        <TextField
          defaultValue={addonCategory.name}
          sx={{ mb: 2, width: "50%" }}
          onChange={(v) =>
            setNewAddonCategory({
              ...newAddonCategory,
              name: v.target.value,
            })
          }
        />

        <Autocomplete
          multiple
          options={locationMenus}
          defaultValue={connectedMenus}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(e, v) => {
            const menuIds = v.map((item) => item.id);
            setNewAddonCategory({ ...newAddonCategory, menuIds });
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          style={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="menus" />}
        />
        <FormControlLabel
          sx={{ m: 2 }}
          control={
            <Android12Switch
              checked={newAddonCategory.isRequire ? true : false}
              onChange={(e) => {
                setNewAddonCategory({
                  ...newAddonCategory,
                  isRequire: e.target.checked,
                });
              }}
            />
          }
          label="require"
        />
        <Button
          variant="contained"
          onClick={updateAddonCategory}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditAddonCategories;

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));
