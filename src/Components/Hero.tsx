import { Box, Button, Slide, Typography } from "@mui/material";
import Panda from "../assets/panda-cooking-chicken.png";
import Image from "next/image";
import Link from "next/link";
import landing from "@/assets/sarr mal.jpg";

const Hero = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: { sm: 5 },
      }}
    >
      <Slide
        direction="down"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <Box>
          <Typography
            sx={{
              maxWidth: 700,
              mb: 4,
              fontSize: { xs: "16px", md: "25px" },
            }}
            variant="h2"
          >
            Manage your Menus Catelog easily with
            <Typography sx={{ fontSize: { xs: 30, sm: 50 } }} color="#00235B">
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
            <Link href={"/order?locationId=1&tableId=1"}>
              <Button
                variant="contained"
                sx={{
                  fontSize: { xs: "13px", md: "20px" },
                  mr: 2,
                  width: "fit-content",
                }}
              >
                Order Now
              </Button>
            </Link>

            <Link href={"/backoffice"}>
              <Button
                variant="contained"
                sx={{
                  fontSize: { xs: "13px", md: "20px" },
                  width: "fit-content",
                }}
              >
                Backoffice
              </Button>
            </Link>
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
            display: { xs: "none", md: "block" },
            ml: 5,
          }}
        >
          <Image src={Panda} width={450} alt="header-image" />
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
          sx={{ display: { xs: "none", sm: "block", md: "none" }, mr: "-10%" }}
        >
          <Image src={Panda} width={300} alt="header-image" />
        </Box>
      </Slide>
    </Box>
  );
};

export default Hero;
