import { Box, Button } from "@mui/material";
import Image from "next/image";
import Sarrmal from "@/assets/Sarr Mal.png";
import Link from "next/link";

const Hero = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: { xs: 3, sm: 4 },
        position: "relative",
      }}
    >
      <Image src={Sarrmal} className=" max-h-screen" alt="sar" />
      <div className=" absolute left-10 sm:left-20 flex space-x-2 md:space-x-5">
        <Link href={"/order?locationId=1&tableId=4"}>
          <Button className=" bg-cyan-400 text-[10px] py-1 text-white capitalize font-semibold  sm:text-sm sm:py-2 rounded-lg">
            Order now
          </Button>
        </Link>
        <Link href={"/backoffice"}>
          <Button className=" bg-cyan-400 rounded-md  hidden text-white capitalize font-semibold md:inline-block sm:text-sm">
            Join Us
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export default Hero;
