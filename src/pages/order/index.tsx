import { OrderContent } from "@/Contents/OrderContent";
import { Menu, MenuCategories } from "@/Types/Types";
import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const Order = () => {
  const { menus, menuCategories } = useContext(OrderContent);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategories>();

  console.log(menus, "menus", "menucate", menuCategories);

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);
  return (
    <Box>
      {selectedMenuCategory &&
        menuCategories.map((menucat, index) => {
          return (
            <Button
              key={index}
              variant={
                selectedMenuCategory.id === menucat.id
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setSelectedMenuCategory(menucat)}
            >
              {menucat.category}
            </Button>
          );
        })}
    </Box>
  );
};

export default Order;
