import { useContext, useState } from "react";

import { Box, TextField, Button, Chip, Stack } from "@mui/material";

import Link from "next/link";
import { MenuCategories } from "@/Types/Types";
import { config } from "@/config/config";
import Layout from "@/Components/Layout";
import { BackofficeContent } from "@/Contents/BackofficeContent";
import { getLocationId } from "@/utils";

const Menu_Categories = () => {
  const { menuCategories, fetchData, menu_menuCategories_locations } =
    useContext(BackofficeContent);
  const selectedLocationId = getLocationId() as string;

  const [menuCat, setMenuCat] = useState<MenuCategories>({
    category: "",
    locationId: parseInt(selectedLocationId, 10),
  });

  const validMenuCategoryIds = menu_menuCategories_locations
    .filter((item) => {
      item.location_id === parseInt(selectedLocationId, 10);
    })
    .map((item) => item.menu_categories_id);

  const filterMenuCategories = menuCategories.filter((item) => {
    item.id && validMenuCategoryIds.includes(item.id);
  });

  //create category

  const createMenuCategory = async () => {
    if (!menuCat?.category) return alert("pls enter name");
    const response = await fetch(
      `${config.apiBackofficeBaseUrl}/menu-categories`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuCat),
      }
    );
    fetchData();
  };

  //delete
  const handleDelete = async (id: any) => {
    const response = await fetch(
      `${config.apiBackofficeBaseUrl}/menu-categories/${id}`,
      {
        method: "DELETE",
      }
    );
    fetchData();
  };

  return (
    <Layout title="Menu-Categories">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "30ch" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Create A New MenuCategory</h1>
        <TextField
          sx={{ minWidth: "400px" }}
          id="filled-basic"
          label="Menu_Category Name"
          variant="filled"
          onChange={(e) => setMenuCat({ ...menuCat, category: e.target.value })}
        />
        <Button variant="contained" onClick={createMenuCategory}>
          Create
        </Button>
      </Box>

      {
        <Stack
          sx={{ display: "flex", justifyContent: "center", mt: 4 }}
          direction="row"
          spacing={1}
        >
          {menuCategories.map((item) => (
            <Link key={item.id} href={`/menu_categories/${item.id}`}>
              <Chip
                sx={{ cursor: "pointer" }}
                label={item.category}
                // onClick={}
                onDelete={() => handleDelete(item?.id)}
              />
            </Link>
          ))}
        </Stack>
      }
    </Layout>
  );
};

export default Menu_Categories;
