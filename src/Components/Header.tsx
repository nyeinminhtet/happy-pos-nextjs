import { Box, Typography } from "@mui/material";
import Image from "next/image";
import headerImg from "../assets/wave.svg";
import foods from "@/assets/food.png";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 100,
        zIndex: 5,
        marginTop: 0,
        position: "relative",
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
          fontSize: { xs: "1.3rem", sm: "2rem", md: "3.5rem" },
          mt: { xs: 2, sm: 3, md: 4 },
          ml: { xs: 5, sm: 4, md: 2 },
        }}
      >
        Sarr Mal
      </Typography>
    </Box>
  );
};

export default Header;
