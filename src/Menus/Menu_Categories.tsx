import { useContext, useState } from "react";
import Layout from "../Components/Layout";
import { MenuContent } from "../Contents/Menu_Contents";
import {
  Box,
  TextField,
  Button,
  Chip,
  Stack,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { MenuCategories } from "../Types/Types";
import { config } from "../config/config";
import { Link } from "react-router-dom";

const Menu_Categories = () => {
  const { menuCategories, fetchData } = useContext(MenuContent);
  const [menuCat, setMenuCat] = useState<MenuCategories | null>(null);

  //create category

  const createMenuCategory = async () => {
    if (!menuCat?.category) return;
    const response = await fetch(`${config.apiBaseUrl}/menu_categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menuCat),
    });
    fetchData();
  };

  //delete
  const handleDelete = async (id: any) => {
    const response = await fetch(`${config.apiBaseUrl}/menu_categories/${id}`, {
      method: "DELETE",
    });
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
          onChange={(e) => setMenuCat({ category: e.target.value })}
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
            <Link to={`/menu_categories/${item.id}`}>
              <Chip
                key={item.id}
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
