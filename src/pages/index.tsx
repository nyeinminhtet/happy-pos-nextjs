import Features from "@/Components/Features";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Hero from "@/Components/Hero";
import Testimonials from "@/Components/Testimonial";
import { Box } from "@mui/material";

const HappyPos = () => {
  return (
    <div
      // sx={{
      //   display: "flex",
      //   width: "100%",
      //   height: "100%",
      //   minHeight: "100vh",
      //   overflowY: "auto",
      //   flexDirection: "column",
      //   m: 0,
      //   position: "relative",
      // }}
      className=" flex w-full h-full min-h-screen overflow-y-auto flex-col relative bg-cyan-50"
    >
      <Header />
      <Box
        sx={{
          // maxWidth: { md: "100%", lg: "1280px" },
          m: 0,
        }}
      >
        <Hero />
        <Features />
        <Box sx={{ mx: 1 }}>
          <Testimonials />
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default HappyPos;
