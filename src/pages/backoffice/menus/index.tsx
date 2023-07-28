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
import Layout from "@/Components/BackofficeLayout";
import NewMenu from "./NewMenu";
import MenuCard from "@/Components/MenuCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import Loading from "@/Components/Loading";

const Menus = () => {
  const { menus, menusMenuCategoriesLocations, menuCategories, isLoading } =
    useAppSelector(appData);
  const [open, setOpen] = useState(false);
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
  }, [menuCategories, validCategory]);

  if (isLoading) return <Loading />;
  if (!validCategory) return null;

  return (
    <Box>
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
              width: "fit-content",
              mb: 2,
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
    </Box>
  );
};

export default Menus;
