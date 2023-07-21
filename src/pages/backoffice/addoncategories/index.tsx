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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import NewAddonCategory from "./NewAddonCategory";

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

  //get menus from locations
  const validMenuIds = menuMenuCategoriesLocations
    .filter((item) => item.location_id === Number(selectedLocationId))
    .map((item) => item.menu_id);
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
      <NewAddonCategory open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default AddonCategories;
