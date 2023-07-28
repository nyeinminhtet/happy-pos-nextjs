import { useState } from "react";
import ClassIcon from "@mui/icons-material/Class";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Layout from "@/Components/BackofficeLayout";
import { getLocationId } from "@/utils";
import ItemCart from "@/Components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import NewAddonCategory from "./NewAddonCategory";
import Loading from "@/Components/Loading";

const AddonCategories = () => {
  const {
    addonCategories,
    menusMenuCategoriesLocations,
    menuAddons,
    addons,
    isLoading,
  } = useAppSelector(appData);

  const selectedLocationId = getLocationId() as string;
  const [open, setOpen] = useState(false);

  //get menus from locations
  const validMenuIds = menusMenuCategoriesLocations
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

  if (isLoading) return <Loading />;

  return (
    <Box>
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
              width: "fit-content",
              color: "#E8F6EF",
              mb: 2,
            }}
          >
            New Addon_Category
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
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
    </Box>
  );
};

export default AddonCategories;
