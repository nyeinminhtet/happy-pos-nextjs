import { useState } from "react";
import { Box, Button } from "@mui/material";
import Layout from "@/Components/backoffice/BackofficeLayout";
import AddIcon from "@mui/icons-material/Add";
import { getAddonCategoryByLocation, getLocationId } from "@/utils";
import ItemCart from "@/Components/backoffice/ItemCart";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import NewAddon from "./NewAddon";
import Loading from "@/Components/Loading";

const Addons = () => {
  const { addons, isLoading, menuAddons, menusMenuCategoriesLocations } =
    useAppSelector(appData);

  const [isOpen, setIsOpen] = useState(false);
  const selectedLocationId = getLocationId() as string;

  //get addon from location

  const validAddonCategoryIds = getAddonCategoryByLocation(
    menusMenuCategoriesLocations,
    menuAddons,
    selectedLocationId
  );

  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addon_category_id)
  );

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "0 auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            mt: { xs: -3, sm: -2, md: 0 },
          }}
        >
          <Button
            onClick={() => setIsOpen(true)}
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
          {validAddons.map((addon) => (
            <ItemCart
              key={addon.id}
              href={`/backoffice/addons/${addon.id}`}
              icon={<LocalPizzaIcon sx={{ fontSize: 40 }} />}
              title={addon.name}
            />
          ))}
        </Box>
      </Box>
      <NewAddon open={isOpen} setOpen={setIsOpen} />
    </Box>
  );
};

export default Addons;
