import React, { useState, useEffect, useContext } from "react";

import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Chip,
} from "@mui/material";
import { useRouter } from "next/router";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import { Locations, Menu } from "@/Types/Types";
import { config } from "@/config/config";
import Layout from "@/Components/Layout";
import FileDropZone from "../filedropzone";
import { LoadingButton } from "@mui/lab";
import { getLocationId } from "@/utils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateMenu = () => {
  const [menuImg, setMenuImg] = useState<File>();
  const [selectedMenucategoryIds, setSelectedMenucategoryIds] = useState<
    number[]
  >([]);
  const { menuMenuCategoriesLocations, menuCategories } =
    useContext(BackofficeContext);
  const selectedLocationId = getLocationId() as string;
  const [menu, setMenu] = useState<Menu>({
    name: "",
    price: 0,
    description: "",
    locationIds: [parseInt(selectedLocationId, 10)],
    menuCategoryIds: selectedMenucategoryIds,
  });
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const validMenuCategoryIds = menuMenuCategoriesLocations
    .filter((item) => {
      item.menu_categories_id &&
        item.location_id === parseInt(selectedLocationId, 10);
    })
    .map((item) => item.menu_categories_id);

  const validMenuCategories = menuCategories.filter((item) => {
    item.id && validMenuCategoryIds.includes(item.id);
  });

  const isDisable =
    !menu.name ||
    !menu.price ||
    !menu.description ||
    !menu.menuCategoryIds.length;

  const onFileSelected = (files: File[]) => {
    setMenuImg(files[0]);
  };

  const createMenu = async () => {
    setIsLoading(true);
    try {
      if (menuImg) {
        const formData = new FormData();
        formData.append("files", menuImg as Blob);
        const response = await fetch(`${config.apiBackofficeBaseUrl}/assets`, {
          method: "POST",
          body: formData,
        });
        const responseData = await response.json();
        const assetUrl = responseData.assetUrl;
        menu.assetUrl = assetUrl;
        console.log(responseData.assetUrl);
      }
      const response = await fetch(`${config.apiBackofficeBaseUrl}/menus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      setIsLoading(false);
      if (response.ok) {
        route.back();
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  const deleteMenu = async (menuId?: number) => {
    if (!menuId) return;
    const response = await fetch(
      `${config.apiBackofficeBaseUrl}/menus/${menuId}`,
      {
        method: "DELETE",
      }
    );
  };

  return (
    <Layout>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 350,
            margin: "0 auto",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Create a new menu</h1>
          <TextField
            label="Name"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
          />
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setMenu({ ...menu, price: parseInt(evt.target.value, 10) })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setMenu({ ...menu, description: evt.target.value })
            }
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Menu-Categories
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedMenucategoryIds}
              onChange={(evt) => {
                const values = evt.target.value as number[];
                setSelectedMenucategoryIds(values);
                console.log("values", values);
                setMenu({ ...menu, menuCategoryIds: values });
              }}
              input={<OutlinedInput label="menu-categories" />}
              renderValue={(values) => {
                const selectedMenuCategories = selectedMenucategoryIds
                  .map((selectedMenuCategoryId) => {
                    return menuCategories.find(
                      (menucategory) =>
                        menucategory.id === selectedMenuCategoryId
                    );
                  })
                  .map(
                    (selectedMenucategory) =>
                      selectedMenucategory && selectedMenucategory.category
                  )
                  .join(", ");
                return selectedMenuCategories;
              }}
              MenuProps={MenuProps}
            >
              {menuCategories.map((menucategory) => (
                <MenuItem key={menucategory.id} value={menucategory.id}>
                  <Checkbox
                    checked={
                      menucategory.id &&
                      selectedMenucategoryIds.includes(menucategory.id)
                        ? true
                        : false
                    }
                  />
                  <ListItemText primary={menucategory.category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FileDropZone onFileSelected={onFileSelected} />
          {menuImg && (
            <Chip
              sx={{ mt: 2 }}
              label={menuImg.name}
              onDelete={() => setMenuImg(undefined)}
            />
          )}
          <Box>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              onClick={createMenu}
              disabled={isDisable}
              sx={{ mt: 2 }}
            >
              create
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default CreateMenu;
