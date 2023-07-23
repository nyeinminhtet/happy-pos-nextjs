import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Tab, Tabs } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getLocationId,
  getMenuCategoryIdByLocationId,
  getMenusByLocationId,
  getMenusByMenuCategoryId,
} from "@/utils";
import Layout from "@/components/BackofficeLayout";
import NewMenu from "./NewMenu";
import MenuCard from "@/components/MenuCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const Menus = () => {
  const { menus, menusMenuCategoriesLocations, menuCategories } =
    useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const locationId = getLocationId() as string;
  const selectedLocation = getLocationId() as string;
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<number>();
  const [value, setValue] = useState(0);

  const validMenus = getMenusByMenuCategoryId(
    menus,
    selectedMenuCategory as number,
    menusMenuCategoriesLocations
  );

  const validCategory = getMenuCategoryIdByLocationId(
    menuCategories,
    selectedLocation,
    menusMenuCategoriesLocations
  );

  useEffect(() => {
    if (validCategory.length) {
      setSelectedMenuCategory(validCategory[0].id);
    }
  }, [menuCategories]);

  if (!validCategory) return null;
  return (
    <Layout title="menus">
      <Box
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            w: "100%",
          }}
        >
          {validCategory.map((item, index) => (
            <Tabs
              value={value}
              key={item.id}
              textColor="inherit"
              TabIndicatorProps={{ style: { background: "#820000" } }}
              onChange={(e, v) => setValue(v)}
            >
              <Tab
                label={item.category}
                value={index}
                onClick={() => setSelectedMenuCategory(item.id)}
              />
            </Tabs>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "0 auto",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              position: "fixed",
              bottom: 0,
              right: 10,
              backgroundColor: "#4E6C50",
              width: "fit-content",
              color: "#E8F6EF",
              mb: 2,
              ":hover": {
                bgcolor: "#820000",
                color: "white",
              },
            }}
          >
            New menu
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validMenus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              href={`/backoffice/menus/${menu.id}`}
            />
          ))}
        </Box>
      </Box>
      <NewMenu open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Menus;
