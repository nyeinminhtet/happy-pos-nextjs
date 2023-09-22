import { Box, Typography } from "@mui/joy";
import React from "react";
import CompaniesDemo from "./CompaniesDemo";

const Companies = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 3,
        alignItems: "center",
        bgcolor: "white",
      }}
    >
      <Typography
        level="h3"
        fontWeight="bold"
        sx={{ fontSize: { xs: 20, sm: 30 } }}
        textColor="#00235B"
      >
        Our Partnership
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CompaniesDemo />
      </Box>
    </Box>
  );
};

export default Companies;
