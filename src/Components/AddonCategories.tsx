import React from "react";
import {
  addon_categories as AddonCategory,
  addons as Addon,
} from "@prisma/client";
import { Box, Chip, FormControl, RadioGroup, Typography } from "@mui/material";
import Addons from "./Addons";

interface Props {
  validAddonCategories: AddonCategory[];
  validAddons: Addon[];
  selectedAddons: Addon[];
  onChange: (checked: boolean, addon: Addon) => void;
}

const AddonCategories = ({
  validAddonCategories,
  validAddons,
  selectedAddons,
  onChange,
}: Props) => {
  return (
    <Box>
      {validAddonCategories.map((item, index) => (
        <Box key={index} sx={{ mb: 2, maxWidth: 350 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              w: "300px",
            }}
          >
            <Typography sx={{ userSelect: "none" }}> {item.name} </Typography>
            <Chip label={item.is_require ? "Required" : "Option"} />
          </Box>
          <FormControl>
            <RadioGroup>
              <Addons
                addonCategory={item}
                validAddons={validAddons}
                selectedAddons={selectedAddons}
                onChange={onChange}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      ))}
    </Box>
  );
};

export default AddonCategories;
