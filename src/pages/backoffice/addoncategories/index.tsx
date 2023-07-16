import { useContext, useState } from "react";
import ClassIcon from "@mui/icons-material/Class";
import {
  Box,
  TextField,
  Button,
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
import AddIcon from "@mui/icons-material/Add";
import { config } from "@/config/config";
import Layout from "@/Components/Layout";
import { getLocationId } from "@/utils";
import ItemCart from "@/Components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

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

const AddonCategories = () => {
  const {
    addonCategories,
    menuMenuCategoriesLocations,
    menus,
    menuAddons,
    locations,
    addons,
  } = useAppSelector(appData);

  const selectedLocationId = getLocationId() as string;
  const [open, setOpen] = useState(false);

  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    menuIds: [] as number[],
  });

  //get menus from locations
  const validMenuIds = menuMenuCategoriesLocations
    .filter((item) => item.location_id === Number(selectedLocationId))
    .map((item) => item.menu_id);
  const validMenus = menus.filter((item) => validMenuIds.includes(item.id));
  //get addoncategories from menus
  const validAddonCateogryIds = menuAddons
    .filter((item) => validMenuIds.includes(item.menu_id))
    .map((item) => item.addon_category_id);

  const validAddonCategories = addonCategories.filter((item) =>
    validAddonCateogryIds.includes(item.id)
  );

  //to get addon count
  const getAddonCount = (addonCategoryId?: number) => {
    if (!addonCategoryId) return 0;
    return addons.filter((item) => item.addon_category_id === addonCategoryId)
      .length;
  };

  const disableButton =
    !newAddonCategory.name && !newAddonCategory.menuIds.length;

  //create category
  const createAddonCategory = async () => {
    if (!newAddonCategory?.name || !newAddonCategory.menuIds.length)
      return alert("Please fill completely Form for new!");
    const response = await fetch(`${config.apiBaseUrl}/addoncategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddonCategory),
    });
    // fetchData();
    setOpen(false);
  };

  //delete
  const handleDelete = async (id: any) => {
    const response = await fetch(`${config.apiBaseUrl}/menu-categories/${id}`, {
      method: "DELETE",
    });
    // fetchData();
  };

  return (
    <Layout title="Addon-Categories">
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#4E6C50",
              width: "fit-content",
              color: "#E8F6EF",
              mb: 2,
              ":hover": {
                bgcolor: "#820000", // theme.palette.primary.main
                color: "white",
              },
            }}
          >
            New Addon_Category
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {validAddonCategories.map((item, index) => (
            <ItemCart
              key={index}
              href={`/backoffice/addoncategories/${item.id}`}
              icon={<ClassIcon sx={{ fontSize: 40 }} />}
              title={item.name}
              subTitle={`${getAddonCount(item.id)} addons`}
            />
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
              setNewAddonCategory({
                ...newAddonCategory,
                name: evt.target.value,
              })
            }
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="select-menu-category">menus</InputLabel>
            <Select
              label="menu"
              multiple
              value={newAddonCategory.menuIds}
              input={<OutlinedInput label="menus" />}
              onChange={(v) => {
                const value = v.target.value as number[];
                setNewAddonCategory({
                  ...newAddonCategory,
                  menuIds: value,
                });
              }}
              renderValue={(value) => {
                const selectedMenuIds = newAddonCategory.menuIds.map(
                  (menuId) => {
                    return validMenus.find((menu) => menu.id === menuId);
                  }
                );
                return selectedMenuIds
                  .map((selectedMenu) => selectedMenu?.name)
                  .join(", ");
              }}
              MenuProps={MenuProps}
            >
              {validMenus.map((menu) => (
                <MenuItem key={menu.id} value={menu.id}>
                  <Checkbox
                    checked={
                      menu.id && newAddonCategory.menuIds.includes(menu.id)
                        ? true
                        : false
                    }
                  />
                  <ListItemText primary={menu.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            disabled={disableButton}
            onClick={createAddonCategory}
            sx={{
              width: "fit-content",
              alignSelf: "flex-end",
              bgcolor: "#820000",
              ":hover": {
                bgcolor: "#820000",
              },
            }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AddonCategories;
