import React from "react";
import {
  addon_categories as AddonCategory,
  addons as Addon,
} from "@prisma/client";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

interface Props {
  addonCategory: AddonCategory;
  validAddons: Addon[];
  selectedAddons: Addon[];
  onChange: (checked: boolean, addon: Addon) => void;
}

const Addons = ({
  addonCategory,
  validAddons,
  selectedAddons,
  onChange,
}: Props) => {
  const addons = validAddons.filter(
    (item) => item.addon_category_id === addonCategory.id
  );
  return (
    <Box>
      {addons.map((item) => {
        return (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              value={item.name}
              control={
                addonCategory.is_require ? (
                  <Radio
                    color="primary"
                    checked={
                      selectedAddons &&
                      selectedAddons.find((addon) => addon.id === item.id)
                        ? true
                        : false
                    }
                    onChange={(evt, value) => onChange(value, item)}
                  />
                ) : (
                  <Checkbox
                    color="primary"
                    checked={
                      selectedAddons.find((addon) => addon.id === item.id)
                        ? true
                        : false
                    }
                    onChange={(evt, value) => onChange(value, item)}
                  />
                )
              }
              label={item.name}
            />
            <Typography sx={{ fontFamily: "cursive", color: "info" }}>
              {item.price} K
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Addons;
