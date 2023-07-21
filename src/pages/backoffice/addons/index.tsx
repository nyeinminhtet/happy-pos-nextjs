import { useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Layout from "@/Components/Layout";
import { config } from "@/config/config";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import AddIcon from "@mui/icons-material/Add";
import { getAddonCategoryByLocation, getLocationId } from "@/utils";
import ItemCart from "@/Components/ItemCart";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import NewAddon from "./NewAddon";

const Addons = () => {
  const { addons, addonCategories, menuAddons, menuMenuCategoriesLocations } =
    useAppSelector(appData);

  const [isOpen, setIsOpen] = useState(false);
  const selectedLocationId = getLocationId() as string;

  //get addon from location

  const validAddonCategoryIds = getAddonCategoryByLocation(
    menuMenuCategoriesLocations,
    menuAddons,
    selectedLocationId
  );

  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addon_category_id)
  );

  return (
    <Layout title="Addons">
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
          }}
        >
          <Button
            onClick={() => setIsOpen(true)}
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
            New Addon
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
    </Layout>
  );
};

export default Addons;
