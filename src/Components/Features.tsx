import { Box, Typography, Zoom } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LocationOn from "@mui/icons-material/LocationOn";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const features = [
  {
    icon: <MenuBookIcon sx={{ fontSize: { xs: "60px", sm: "90px" } }} />,
    text: "Easily manage your menus with Sarr Mal",
    delay: "1000ms",
  },
  {
    icon: <QrCode2Icon sx={{ fontSize: { xs: "60px", sm: "90px" } }} />,
    text: "Scan and order. Quick and easy! Your customers will love it!",
    delay: "1300ms",
  },
  {
    icon: <LocationOn sx={{ fontSize: { xs: "60px", sm: "90px" } }} />,
    text: "Sarr Mal supports multiple locations for your business.",
    delay: "1500ms",
  },
  {
    icon: <ChecklistIcon sx={{ fontSize: { xs: "60px", sm: "90px" } }} />,
    text: "Backoffice and order apps are included in every subscription.",
    delay: "1700ms",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: { xs: "60px", sm: "90px" } }} />,
    text: "Dedicated customer support so that we are awlays here to help you.",
    delay: "2000ms",
  },
];

const Features = () => {
  return (
    <Box
      sx={{
        display: "flex",
        mt: { xs: 7, sm: 9 },
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {features.map((item) => {
        return (
          <Zoom
            key={item.text}
            in={true}
            style={{
              transitionDelay: true ? item.delay : "0ms",
              transitionDuration: "1000ms",
            }}
          >
            <Box sx={{ textAlign: "center", maxWidth: 300, mb: 8, px: 5 }}>
              {item.icon}

              <Typography
                variant="h6"
                className=" text-gray-600 text-sm md:text-lg"
              >
                {item.text}
              </Typography>
            </Box>
          </Zoom>
        );
      })}
    </Box>
  );
};

export default Features;
