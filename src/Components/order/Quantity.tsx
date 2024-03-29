import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
  value: number;
  decrease: () => void;
  increase: () => void;
}

const Quantity = ({ value, decrease, increase }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        maxWidth: "100px",
        justifyContent: "center",
        m: "0 auto",
        mt: -2,
      }}
    >
      <IconButton
        disabled={value === 1 ? true : false}
        color="primary"
        onClick={decrease}
      >
        <RemoveCircleIcon />
      </IconButton>
      <Typography variant="h5">{value}</Typography>
      <IconButton color="primary" onClick={increase}>
        <AddCircleIcon />
      </IconButton>
    </Box>
  );
};

export default Quantity;
