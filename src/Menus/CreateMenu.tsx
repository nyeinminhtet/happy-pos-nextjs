import React, { useState, useEffect, useContext } from "react";
import { Menu } from "../Types/Types";
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
import Layout from "../Components/Layout";
import FileDropZone from "./FileDropZone";
import { config } from "../config/config";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { MenuContent } from "../Contents/Menu_Contents";

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
  const { locations } = useContext(MenuContent);
  const [menu, setMenu] = useState<Menu>({
    name: "",
    price: 0,
    description: "",
    locationIds: [],
  });
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const isDisable =
    !menu.name || !menu.price || !menu.description || !menu.locationIds.length;

  useEffect(() => {
    // console.log("menu", menu);
  }, [menu]);

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
        console.log(responseData.assetUrl);
      }
      const response = await fetch(`${config.apiBaseUrl}/menus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      setIsLoading(false);
      if (response.ok) {
        navigate("/menus");
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
            <InputLabel id="demo-multiple-checkbox-label">locations</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedLocationIds}
              onChange={(evt) => {
                const values = evt.target.value as number[];
                setSelectedLocationIds(values);
                console.log("values", values);
                setMenu({ ...menu, locationIds: values });
              }}
              input={<OutlinedInput label="locations" />}
              renderValue={(values) => {
                const selectedLocations = selectedLocationIds
                  .map((selectedLocationId) => {
                    return locations.find(
                      (location) => location.id === selectedLocationId
                    );
                  })
                  .map(
                    (selectedLocation) =>
                      selectedLocation && selectedLocation.name
                  )
                  .join(", ");
                return selectedLocations;
                // return selectedLocations
                //   .map(
                //     (selectedLocation) =>
                //       selectedLocation && selectedLocation.name
                //   )
                //   .join(", ");
              }}
              MenuProps={MenuProps}
            >
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  <Checkbox
                    checked={
                      location.id && selectedLocationIds.includes(location.id)
                        ? true
                        : false
                    }
                  />
                  <ListItemText primary={location.name} />
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
