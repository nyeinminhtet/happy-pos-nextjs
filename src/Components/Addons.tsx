import React from "react";
import {
  addon_categories as AddonCategory,
  addons as Addon,
} from "@prisma/client";
import { Box, Checkbox, FormControlLabel, Radio } from "@mui/material";

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
          <Box key={item.id}>
            <FormControlLabel
              value={item.name}
              control={
                addonCategory.is_require ? (
                  <Radio
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
          </Box>
        );
      })}
    </Box>
  );
};

export default Addons;
