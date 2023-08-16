import { Box, Button, Slide } from "@mui/material";
import Image from "next/image";
import Sarrmal from "@/assets/pizza.png";
import { AspectRatio, Card, Typography } from "@mui/joy";
import online from "@/assets/Order ahead-rafiki.png";
import Link from "next/link";

const Hero = () => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        bgcolor: "#98DFD6",
      }}
    >
      <Slide
        direction="right"
        in={true}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            position: "absolute",
            left: { xs: "7%", sm: "15%", md: "30%" },
            top: { xs: 50, sm: "16%", md: "30%" },
          }}
        >
          <Typography
            level="h2"
            maxWidth={{ xs: 200, sm: 300 }}
            fontSize={{ xs: 20, sm: 27, md: 35 }}
            fontWeight="bold"
          >
            Are you finding a solution for your restaurant ?
          </Typography>
          <Typography
            level="title-lg"
            fontSize={{ xs: 13, sm: 20 }}
            textColor="gray"
          >
            let's Join with us
          </Typography>
          <Typography
            fontSize={{ xs: 13, sm: 16 }}
            textColor="black"
            maxWidth={{ xs: 140, md: 190 }}
            mt={2}
          >
            We will help your business.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Link
              href="/backoffice"
              style={{ textDecoration: "none", color: "white" }}
            >
              Join us
            </Link>
          </Button>
        </Box>
      </Slide>

      <Slide
        direction="left"
        in={true}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <Box sx={{ maxWidth: 600 }}>
          <Image
            src={online}
            alt=""
            width={300}
            height={400}
            layout="responsive"
          />
        </Box>
      </Slide>
    </Card>
  );
};

export default Hero;
