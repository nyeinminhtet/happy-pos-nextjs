import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Tab, Tabs } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getLocationId,
  getMenuCategoryIdByLocationId,
  getMenusByMenuCategoryId,
} from "@/utils";
import NewMenu from "./NewMenu";
import MenuCard from "@/Components/MenuCard";
import { useAppSelector } from "@/store/hooks";
import { appData, selectMenuCategories } from "@/store/slices/appSlice";
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
  }, [menuCategories]);

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          w: { xs: "60%", md: "100%" },
        }}
      >
        <Tabs
          value={value}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
          variant="scrollable"
          orientation="horizontal"
          onChange={(e, v) => setValue(v)}
        >
          {validCategory.map((item, index) => {
            return (
              <Tab
                wrapped={true}
                key={index}
                sx={{
                  fontSize: { xs: "10px", sm: "14px" },
                  px: { xs: 1, sm: 1, md: 5 },
                }}
                label={item.category}
                onClick={() => setSelectedMenuCategory(item.id)}
              />
            );
          })}
        </Tabs>
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
            sx={{
              position: "fixed",
              bottom: 0,
              right: 10,
              width: "fit-content",
              mb: 2,
            }}
          >
            <AddIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            w: { xs: "50%", sm: "80%" },
          }}
        >
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
