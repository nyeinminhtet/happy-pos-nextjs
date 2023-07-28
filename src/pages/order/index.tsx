import Loading from "@/Components/Loading";
import MenuCard from "@/Components/MenuCard";
import OrderLayout from "@/Components/OrderLayout";
import ViewCartBar from "@/Components/ViewCartBar";
import { useAppSelector } from "@/store/hooks";
import { appData, selectLocations } from "@/store/slices/appSlice";
import { getMenusByMenuCategoryId } from "@/utils";
import { Box, Tabs, Tab } from "@mui/material";
import { menu_categories as MenuCategories } from "@prisma/client";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const OrderApp = () => {
  const { menus, menuCategories, menusMenuCategoriesLocations, isLoading } =
    useAppSelector(appData);

  const router = useRouter();
  const query = router.query;
  const selectedLocationId = query.locationId as string;
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategories>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);

  const renderMenu = useCallback(() => {
    const isValid = selectedLocationId && selectedMenuCategory;
    if (!isValid) return;
    const menuCategoryId = Number(selectedMenuCategory.id);

    const validMenus = getMenusByMenuCategoryId(
      menus,
      menuCategoryId,
      menusMenuCategoriesLocations
    );

    return validMenus.map((item) => {
      const href = { pathname: `/order/menus/${item.id}`, query };
      return <MenuCard href={href} key={item.id} menu={item} />;
    });
  }, [
    menus,
    selectedMenuCategory,
    query,
    selectedLocationId,
    menusMenuCategoriesLocations,
  ]);

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Box>
        <Tabs
          value={value}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            w: "100%",
          }}
          onChange={(e, v) => setValue(v)}
        >
          {menuCategories.map((item, index) => {
            return (
              <Tab
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  w: "100%",
                }}
                label={item.category}
                onClick={() => setSelectedMenuCategory(item)}
              />
            );
          })}
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
        {renderMenu()}
      </Box>
    </Box>
  );
};

export default OrderApp;
