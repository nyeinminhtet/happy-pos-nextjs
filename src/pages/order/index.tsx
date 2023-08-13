import Loading from "@/Components/Loading";
import MenuCard from "@/Components/MenuCard";
import OrderHero from "@/Components/OrderHero";
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
        <OrderHero />
      </Box>
      <Box>
        <Tabs
          value={value}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            position: "sticky",
            top: 0,
            width: { xs: "100%" },
            bgcolor: "#00235B",
            border: "1px solid white",
            zIndex: 10,
          }}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          orientation="horizontal"
          allowScrollButtonsMobile
          onChange={(e, v) => setValue(v)}
        >
          {menuCategories.map((item, index) => {
            return (
              <Tab
                wrapped={true}
                key={index}
                sx={{
                  fontSize: { xs: "10px", sm: "14px" },
                  px: { xs: 1, sm: 3 },
                  color: "white",
                }}
                label={item.category}
                onClick={() => setSelectedMenuCategory(item)}
              />
            );
          })}
        </Tabs>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 3,
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "start" },
          }}
        >
          {renderMenu()}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderApp;
