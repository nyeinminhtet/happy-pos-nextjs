import { Box, Typography, Zoom } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LocationOn from "@mui/icons-material/LocationOn";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const features = [
  {
    icon: <MenuBookIcon sx={{ fontSize: "90px", color: "#1B9C85" }} />,
    text: "Easily manage your menus with Happy POS App",
    delay: "1000ms",
  },
  {
    icon: <QrCode2Icon sx={{ fontSize: "90px", color: "#1B9C85" }} />,
    text: "Scan and order. Quick and easy! Your customers will love it!",
    delay: "1300ms",
  },
  {
    icon: <LocationOn sx={{ fontSize: "90px", color: "#1B9C85" }} />,
    text: "Happy POS App supports multiple locations for your business.",
    delay: "1500ms",
  },
  {
    icon: <ChecklistIcon sx={{ fontSize: "90px", color: "#1B9C85" }} />,
    text: "Backoffice and order apps are included in every subscription.",
    delay: "1700ms",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: "90px", color: "#1B9C85" }} />,
    text: "Dedicated customer support so that we are awlays here to help you.",
    delay: "2000ms",
  },
];

const Features = () => {
  return (
    <Box
      sx={{
        display: "flex",
        mt: 15,
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
            <Box sx={{ textAlign: "center", maxWidth: 330, mb: 10, px: 5 }}>
              {item.icon}

              <Typography variant="h6">{item.text}</Typography>
            </Box>
          </Zoom>
        );
      })}
    </Box>
  );
};

export default Features;
