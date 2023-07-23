import { useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Layout from "@/components/BackofficeLayout";
import { getLocationId, getMenuCategoryIdByLocationId } from "@/utils";
import CreateMenuCategory from "./CreateMenuCategory";
import CategoryIcon from "@mui/icons-material/Category";
import ItemCart from "@/components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const Menu_Categories = () => {
  const [open, setOpen] = useState(false);
  const { menuCategories, menusMenuCategoriesLocations, locations } =
    useAppSelector(appData);
  const selectedLocationId = getLocationId() as string;

  const validMenuCategoryIds = getMenuCategoryIdByLocationId(
    menuCategories,
    selectedLocationId,
    menusMenuCategoriesLocations
  );
  const getMenuCount = (menuCategoryId?: number) => {
    if (!menuCategoryId) return 0;
    return menusMenuCategoriesLocations.filter(
      (item) =>
        item.menu_categories_id === menuCategoryId &&
        item.menu_id &&
        item.location_id === Number(selectedLocationId)
    ).length;
  };

  return (
    <Layout title="Menu-Categories">
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
            New menuCategory
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validMenuCategoryIds.map((item, index) => (
            <ItemCart
              key={index}
              href={`/backoffice/menucategories/${item.id}`}
              icon={<CategoryIcon sx={{ fontSize: 40 }} />}
              title={item.category}
              subTitle={`${getMenuCount(item.id)} menus`}
            />
          ))}
        </Box>
      </Box>
      <CreateMenuCategory open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Menu_Categories;
