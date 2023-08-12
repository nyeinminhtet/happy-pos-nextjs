import Features from "@/Components/Features";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Hero from "@/Components/Hero";
import Testimonials from "@/Components/Testimonial";
import { Box } from "@mui/material";

const HappyPos = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        overflowY: "auto",
        flexDirection: "column",
        m: 0,
        position: "relative",
        bgcolor: "#F1F0E8",
      }}
    >
      <Header />
      <Box
        sx={{
          maxWidth: { md: "100%", lg: "1280px" },
          mt: { xs: 5, sm: 0 },
        }}
      >
        <Hero />
        <Features />
        <Box sx={{ mx: 1 }}>
          <Testimonials />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default HappyPos;
