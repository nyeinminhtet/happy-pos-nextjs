import { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Link,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "@/Components/Layout";
import { config } from "@/config/config";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import AddIcon from "@mui/icons-material/Add";
import { getLocationId } from "@/utils";
const Addons = () => {
  const {
    fetchData,
    addons,
    addonCategories,
    menus,
    menuAddons,
    menuMenuCategoriesLocations,
  } = useContext(BackofficeContext);

  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const selectedLocationId = getLocationId() as string;

  const isDisable = !newAddon.name && !newAddon.price;
  //get addon from location
  const locationMenuIds = menuMenuCategoriesLocations
    .filter((item) => item.location_id === Number(selectedLocationId))
    .map((item) => item.menu_id);

  const validAddonCateogryIds = menuAddons
    .filter((item) => locationMenuIds.includes(item.menu_id))
    .map((item) => item.addon_category_id);

  const validAddonCategories = addonCategories.filter((item) =>
    validAddonCateogryIds.includes(item.id)
  );

  const validAddons = addons.filter((item) =>
    validAddonCateogryIds.includes(item.addon_category_id)
  );

  //create addon
  const createAddon = async () => {
    setIsOpen(false);
    const response = await fetch(`${config.apiBackofficeBaseUrl}/addons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddon),
    });
    setNewAddon({ name: "", price: 0, addonCategoryId: "" });
    fetchData();
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
            <Link
              key={addon.id}
              href={`/backoffice/addons/${addon.id}`}
              style={{
                textDecoration: "none",
                marginRight: "15px",
                marginBottom: "20px",
              }}
            >
              <Card sx={{ width: 250, height: 100 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {addon.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    color={"gray"}
                    component="div"
                  >
                    {addon.price} k
                  </Typography>
                </CardContent>
              </Card>
            </Link>
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
            sx={{ width: "fit-content", alignSelf: "flex-end" }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Addons;
