import { Box, Button, Slide, Typography } from "@mui/material";
import Panda from "../assets/panda-cooking.png";
import Image from "next/image";

const Hero = () => {
  return (
    <Box
      sx={{
        mt: 16,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Slide
        direction="down"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <Box sx={{ ml: 10 }}>
          <Typography
            sx={{
              maxWidth: 700,
              mb: 4,
              fontSize: { xs: "16px", md: "25px" },
            }}
            variant="h2"
          >
            Manage your menu catelog easily with
            <Typography fontSize={50} color="#00235B">
              Sarr Mal
            </Typography>
            and entice your customers with QR code ordering system.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                mr: 2,
                width: "fit-content",
                // backgroundColor: "#4C4C6D",
                // ":hover": { bgcolor: "#00235B" },
              }}
            >
              Order App
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                width: "fit-content",
                // backgroundColor: "#4C4C6D",
                // ":hover": { bgcolor: "#00235B" },
              }}
            >
              Backoffice App
            </Button>
          </Box>
        </Box>
      </Slide>
      <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <Box
          sx={{
            width: { xs: "80%", md: "40%", lg: "30%" },
            display: { xs: "none", md: "block" },
            ml: 5,
          }}
        >
          <Image src={Panda} width={450} alt="header-image" />
        </Box>
      </Slide>
    </Box>
  );
};

export default Hero;
