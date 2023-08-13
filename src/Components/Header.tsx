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
    >
      <Box
        sx={{
          position: "static",
          top: 0,
          display: "flex",
          justifyContent: "space-evenly",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "white",
            fontSize: { xs: "2rem", md: "2.5rem" },
            mt: 0,
            display: "flex",
          }}
        >
          Sarr Mal
          <Image src={food} alt="food" width={40} height={40} />
        </Typography>
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
