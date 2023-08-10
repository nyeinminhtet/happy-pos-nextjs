import { useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Layout from "@/Components/BackofficeLayout";
import { getLocationId, getMenuCategoryIdByLocationId } from "@/utils";
import CreateMenuCategory from "./CreateMenuCategory";
import CategoryIcon from "@mui/icons-material/Category";
import ItemCart from "@/Components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import Loading from "@/Components/Loading";

const Menu_Categories = () => {
  const [open, setOpen] = useState(false);
  const { menuCategories, menusMenuCategoriesLocations, isLoading } =
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

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            mt: { xs: -3, sm: -2, md: 0 },
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            sx={{
              width: "fit-content",
              color: "#E8F6EF",
              mb: 2,
            }}
          >
            <AddIcon />
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validMenuCategoryIds.map((item, index) => (
            <ItemCart
              key={index}
              href={`/backoffice/menucategories/${item.id}`}
              icon={<CategoryIcon sx={{ fontSize: { xs: 35, sm: 40 } }} />}
              title={item.category}
              subTitle={`${getMenuCount(item.id)} menus`}
            />
          ))}
        </Box>
      </Box>
      <CreateMenuCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Menu_Categories;
