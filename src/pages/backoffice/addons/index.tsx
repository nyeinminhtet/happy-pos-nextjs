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

const Addons = () => {
  const { addons, addonCategories, menuAddons, menuMenuCategoriesLocations } =
    useAppSelector(appData);

  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const selectedLocationId = getLocationId() as string;

  const isDisable = !newAddon.name && !newAddon.price;
  //get addon from location

  const validAddonCategoryIds = getAddonCategoryByLocation(
    menuMenuCategoriesLocations,
    menuAddons,
    selectedLocationId
  );

  const validAddonCategories = addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );
  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addon_category_id)
  );

  //create addon
  const createAddon = async () => {
    setIsOpen(false);
    const response = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddon),
    });
    setNewAddon({ name: "", price: 0, addonCategoryId: "" });
    //fetchData();
  };

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
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Create new addon</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 300,
            minHeight: 150,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            sx={{ my: 2 }}
            onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
          />
          <TextField
            label="price"
            type="number"
            variant="outlined"
            sx={{ my: 2 }}
            onChange={(e) =>
              setNewAddon({ ...newAddon, price: Number(e.target.value) })
            }
          />
          <FormControl sx={{ m: "1rem 0", minWidth: 120 }} size="medium">
            <InputLabel id="demo-select-small-label">AddonCategory</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={newAddon.addonCategoryId}
              label="AddonCategory"
              onChange={(e) => {
                setNewAddon({ ...newAddon, addonCategoryId: e.target.value });
              }}
            >
              {validAddonCategories.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            disabled={isDisable}
            onClick={createAddon}
            sx={{
              width: "fit-content",
              alignSelf: "flex-end",
              bgcolor: "#820000",
              color: "white",
              ":hover": {
                bgcolor: "#820000",
              },
            }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Addons;
