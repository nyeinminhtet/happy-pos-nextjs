import { Avatar, Box, Paper, Slide, Typography } from "@mui/material";
import Image from "next/image";
import pic1 from "../assets/pic1.jpeg";
import pic2 from "../assets/pic2.jpeg";
import pic3 from "../assets/pic3.jpeg";

const testimonials = [
  {
    name: "Nyein Min Htet",
    company: "Goody Co. Ltd",
    avatar: pic1,
    description: `We increased our sale by 120% during the first 3 months of using Sarr Mal. Easy and simple to use. 
        Super duper recommended for everyone who are less tech savy. 5/5`,
  },
  {
    name: "Phoo Wai Ko,",
    company: "Tasty Foods Co. Ltd",
    avatar: pic2,
    description: `Our customers love Sarr Mal. Quick and easy with QR code ordering. We now spend more time taking 
        care of our customers instead of taking orders manually. Thanks to Sarr Mal!`,
  },
  {
    name: "Bhone Khant Htoo",
    company: "Swel Mel Co. Ltd",
    avatar: pic3,
    description: `Integrated system. Easy to use. Very satisfied. Highly recommended for everyone. 
      Sarr Mal customer service is a top-notch! They are always there when we need help. 5 starsss!`,
  },
];

const Testimonials = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        my: 5,
        minHeight: 350,
        flexWrap: "wrap",
      }}
    >
      {testimonials.map((item) => {
        return (
          <Slide direction="up" in key={item.description}>
            <Paper
              sx={{
                width: 300,
                height: 180,
                p: 2,
                mb: 3,
                borderRadius: 3,
                position: "relative",
                bgcolor: "#FFDD83",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Avatar alt={item.name} sx={{ mr: 2 }}>
                  <Image src={item.avatar} alt={item.name} fill />
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontStyle: "italic",
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontStyle: "italic",
                    }}
                  >
                    {item.company}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "12px", sm: "15px" } }}
              >
                {item.description}
              </Typography>
            </Paper>
          </Slide>
        );
      })}
    </Box>
  );
};

export default Testimonials;
