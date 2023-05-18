import { useContext, useState } from "react";
import Layout from "../Components/Layout";
import { MenuContent } from "../Contents/Menu_Contents";
import { AddonCategories } from "../Types/Types";
import { Box, Button, Chip, Link, Stack, TextField } from "@mui/material";
import { config } from "../config/config";

const Addons_Categories = () => {
  const { addonCategories, fetchData } = useContext(MenuContent);
  const [newAddonCat, setNewAddonCat] = useState<AddonCategories | null>(null);

  const createCat = async () => {
    const response = await fetch(`${config.apiBaseUrl}/addon_categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddonCat),
    });
    fetchData();
  };
  return (
    <Layout>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",

          justifyContent: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Create Addon Category</h1>
        <TextField
          sx={{ minWidth: "400px" }}
          id="filled-basic"
          label="Addon Category"
          variant="filled"
          onChange={(e) =>
            setNewAddonCat({ category_of_addon: e.target.value })
          }
        />
        <Button variant="contained" onClick={createCat}>
          Create
        </Button>
      </Box>
      <Stack
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
        direction="row"
        spacing={1}
      >
        {addonCategories.map((item) => (
          <Chip
            key={item.id}
            style={{ cursor: "pointer" }}
            label={item.category_of_addon}
          />
        ))}
      </Stack>
    </Layout>
  );
};

export default Addons_Categories;
