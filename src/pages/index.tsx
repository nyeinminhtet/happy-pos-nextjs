import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonial";
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
