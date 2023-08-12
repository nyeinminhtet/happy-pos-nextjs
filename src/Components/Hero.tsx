import { Box, Button } from "@mui/material";
import Image from "next/image";
import Sarrmal from "@/assets/Sarr Mal.png";

const Hero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Image
        src={Sarrmal}
        width={1200}
        height={800}
        alt="sarmal"
        layout="responsive"
      />

      <Box sx={{ position: "absolute", left: { xs: "20%", sm: "30%" } }}></Box>
    </Box>
  );
};

export default Hero;
