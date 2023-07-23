import { Box, Typography } from "@mui/material";
import Image from "next/image";
import headerImg from "../assets/wave.svg";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        height: 100,
        top: 0,
        zIndex: 5,
        marginTop: 0,
      }}
    >
      <Image
        src={headerImg}
        style={{
          width: "100%",
          padding: 0,
          margin: 0,
          objectFit: "cover",
        }}
        alt="header-image"
      />

      <Typography
        variant="h2"
        sx={{
          position: "absolute",
          fontWeight: "bold",
          color: "white",
          mt: 4,
        }}
      >
        Sarr Mal
      </Typography>
    </Box>
  );
};

export default Header;
