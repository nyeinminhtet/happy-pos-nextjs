import React from "react";
import {
  addon_categories as AddonCategory,
  addons as Addon,
} from "@prisma/client";
import {
  Box,
  Chip,
  Divider,
  FormControl,
  RadioGroup,
  Typography,
} from "@mui/material";
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
            <Typography
              sx={{
                userSelect: "none",
                fontSize: 17,
                fontWeight: "bold",
              }}
              variant="h6"
            >
              {item.name}
            </Typography>
            <Chip
              label={item.is_require ? "Required" : "Option"}
              color={item.is_require ? "error" : "primary"}
            />
          </Box>
          <Box sx={{ pl: 1, mt: 1 }}>
            <Addons
              addonCategory={item}
              validAddons={validAddons}
              selectedAddons={selectedAddons}
              onChange={onChange}
            />
          </Box>
          <Divider sx={{ borderBottomWidth: 3, color: "black" }} />
        </Box>
      ))}
    </Box>
  );
};

export default AddonCategories;
