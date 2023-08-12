import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import food from "../assets/food.png";
import Link from "next/link";

const Header = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bgcolor: "#00235B",
        py: 1,
        top: 0,
        right: 0,
        left: 0,
        w: "100%",
        zIndex: 10,
      }}
      // className=" fixed py-1 top-0 inset-x-0 w-full z-10 bg-[#00235B]"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              mt: 0,
              display: "flex",
            }}
            // className=" text-sm md:text-3xl text-white flex items-center font-bold"
          >
            Sarr Mal
          </Typography>
          <Image src={food} alt="food" style={{ width: 30, height: 30 }} />
        </Box>
        <Box sx={{ ml: { xs: 5, sm: 0 } }}>
          <Link href="/order?locationId=1&tableId=4">
            <Button
              sx={{
                color: "white",
                bgcolor: "#98DFD6",
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: { xs: 10, sm: 12, md: 14 },
              }}
            >
              Order now
            </Button>
          </Link>
          <Link href="/backoffice">
            <Button
              sx={{
                color: "white",
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: { xs: 10, sm: 12, md: 14 },
                ml: { xs: 1, md: 3 },
                ":hover": { textDecoration: "underline" },
                display: { xs: "none", sm: "inline-block" },
              }}
            >
              Join us
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
