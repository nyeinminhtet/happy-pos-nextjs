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
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import { config } from "@/config/config";
import Layout from "@/Components/Layout";
import FileDropZone from "../filedropzone";
import { LoadingButton } from "@mui/lab";
import { getLocationId, getMenuCategoryIdByLocationId } from "@/utils";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewMenu = ({ open, setOpen }: Props) => {
  const [menuImg, setMenuImg] = useState<File>();
  const [selectedMenucategoryIds, setSelectedMenucategoryIds] = useState<
    number[]
  >([]);
  const { menuMenuCategoriesLocations, menuCategories } =
    useAppSelector(appData);
  const selectedLocationId = getLocationId() as string;
  const [menu, setMenu] = useState({
    name: "",
    price: 0,
    locationIds: [parseInt(selectedLocationId, 10)],
    menuCategoryIds: selectedMenucategoryIds,
    assetUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validMenuCategories = getMenuCategoryIdByLocationId(
    menuCategories,
    selectedLocationId,
    menuMenuCategoriesLocations
  ).map((item) => ({ id: item.id, label: item.category }));

  const isDisable = !menu.name || !menu.price || !menu.menuCategoryIds.length;

  const onFileSelected = (files: File[]) => {
    setMenuImg(files[0]);
  };

  const createMenu = async () => {
    setIsLoading(true);
    try {
      if (menuImg) {
        const formData = new FormData();
        formData.append("files", menuImg as Blob);
        const response = await fetch(`${config.apiBaseUrl}/assets`, {
          method: "POST",
          body: formData,
        });
        const responseData = await response.json();
        const assetUrl = responseData.assetUrl;
        menu.assetUrl = assetUrl;
      }
      const response = await fetch(`${config.apiBaseUrl}/menus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      setIsLoading(false);
      if (response.ok) {
        // fetchData();
        setOpen(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  const deleteMenu = async (menuId?: number) => {
    if (!menuId) return;
    const response = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
      method: "DELETE",
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle fontSize={30} align="center">
        Create new menu
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 350,
              margin: "0 auto",
            }}
          >
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
            <FormControl>
              <InputLabel id="select-menu-categories">
                Menu categories
              </InputLabel>
              <Select
                label="Menu category"
                multiple
                value={selectedMenucategoryIds}
                onChange={(evt) => {
                  const values = evt.target.value as number[];
                  setSelectedMenucategoryIds(values);
                  setMenu({ ...menu, menuCategoryIds: values });
                }}
                input={<OutlinedInput label="Menu categories" />}
                renderValue={(values) => {
                  const selectedMenuCategories = selectedMenucategoryIds.map(
                    (selectedMenuCategoryId) => {
                      return menuCategories.find(
                        (menuCategory) =>
                          menuCategory.id === selectedMenuCategoryId
                      );
                    }
                  );
                  return selectedMenuCategories
                    .map(
                      (selectedMenuCategory) =>
                        selectedMenuCategory && selectedMenuCategory.category
                    )
                    .join(", ");
                }}
              >
                {menuCategories.map((menuCategory) => (
                  <MenuItem key={menuCategory.id} value={menuCategory.id}>
                    <Checkbox
                      checked={
                        menuCategory.id &&
                        selectedMenucategoryIds.includes(menuCategory.id)
                          ? true
                          : false
                      }
                    />
                    <ListItemText primary={menuCategory.category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <FileDropZone onFileSelected={onFileSelected} />
              {menuImg && (
                <Chip
                  sx={{ mt: 2 }}
                  label={menuImg.name}
                  onDelete={() => setMenuImg(undefined)}
                />
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                onClick={createMenu}
                disabled={isDisable}
                sx={{
                  mt: 2,
                  width: "fit-content",
                  bgcolor: "#820000",
                  color: "white",
                  ":hover": { bgcolor: "#820000" },
                }}
              >
                Create Menu
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewMenu;
