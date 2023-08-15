import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { config } from "@/config/config";
import { getLocationId, getMenusByLocationId } from "@/utils";
import DeleteDialog from "@/Components/backoffice/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  removeAddonCategory,
  updateAddonCategory,
} from "@/store/slices/addonCategoriesSlice";
import { addon_categories as AddonCategory } from "@prisma/client";
import Loading from "@/Components/Loading";
import { toast, ToastContainer } from "react-toastify";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const EditAddonCategories = () => {
  const route = useRouter();
  const addonCategoryId = route.query.id as string;
  const [open, setOpen] = useState(false);
  const selectedLocationId = getLocationId() as string;
  const {
    addonCategories,
    menus,
    menusMenuCategoriesLocations,
    menuAddons,
    isLoading,
  } = useAppSelector(appData);
  const dispatch = useAppDispatch();

  const addonCategory = addonCategories.find(
    (item) => item.id === parseInt(addonCategoryId, 10)
  ) as AddonCategory;

  //get menus from location
  const locationMenus = getMenusByLocationId(
    selectedLocationId,
    menusMenuCategoriesLocations,
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

  const HandleUpdateAddonCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/addoncategories`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddonCategory),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateAddonCategory(data));
      route.back();
      toast.success("AddonCategory has been successfully updated!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  //delete || archive
  const deleteAddonCategory = async () => {
    await fetch(`${config.apiBaseUrl}/addoncategories?id=${addonCategoryId}`, {
      method: "DELETE",
    });
    setOpen(false);
    addonCategory && dispatch(removeAddonCategory(addonCategory));
    route.back();
    toast.success("AddonCategory has been successfully deleted!");
  };

  if (isLoading) return <Loading />;
  if (!addonCategory) return null;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{
            backgroundColor: "#E21818",
            mt: { xs: -3, md: 0 },
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
        <TextField
          label="Name"
          defaultValue={addonCategory.name}
          sx={{ mb: 2, maxWidth: { xs: 250, sm: 350 } }}
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
          sx={{ maxWidth: { xs: 250, sm: 350 } }}
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
          renderInput={(params) => <TextField {...params} label="menus" />}
        />
        <FormControlLabel
          sx={{ my: { xs: 1, md: 2 } }}
          control={
            <Switch
              defaultChecked={newAddonCategory?.isRequire ? true : false}
              onChange={(evt) =>
                setNewAddonCategory({
                  ...newAddonCategory,
                  isRequire: evt.target.checked,
                })
              }
            />
          }
          label="required"
        />
        <Button
          variant="contained"
          onClick={HandleUpdateAddonCategory}
          sx={{ width: "fit-content", mt: { xs: 1, md: 3 } }}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="AddonCategory"
        deleteFun={deleteAddonCategory}
      />
    </Box>
  );
};

export default EditAddonCategories;
