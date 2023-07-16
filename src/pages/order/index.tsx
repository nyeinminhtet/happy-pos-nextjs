import MenuCard from "@/Components/MenuCard";
import ViewCartBar from "@/Components/ViewCartBar";
import { OrderContent } from "@/Contents/OrderContext";
import { getMenusByMenuCategoryId } from "@/utils";
import { Box, Tabs, Tab } from "@mui/material";
import { menu_categories as MenuCategories } from "@prisma/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Order = () => {
  const { menus, menuCategories, menusMenuCategoriesLocations } =
    useContext(OrderContent);
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

  const renderMenu = () => {
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
  };
  if (!selectedMenuCategory) return null;

  return (
    <Box sx={{ w: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          borderTop: 1,
          m: 2,
        }}
      >
        <Tabs
          value={value}
          variant="scrollable"
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
      <Box sx={{ display: "flex", alignItems: "center", m: 2, p: 3 }}>
        {renderMenu()}
      </Box>

      <ViewCartBar />
    </Box>
  );
};

export default Order;
