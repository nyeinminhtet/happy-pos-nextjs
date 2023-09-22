import { Box, Typography, Zoom } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LocationOn from "@mui/icons-material/LocationOn";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { Card } from "@mui/joy";

const features = [
  {
    icon: <MenuBookIcon sx={{ fontSize: { xs: "30px", sm: "50px" } }} />,
    text: "Easily manage your menus with Sarr Mal",
    delay: "1000ms",
  },
  {
    icon: <QrCode2Icon sx={{ fontSize: { xs: "30px", sm: "50px" } }} />,
    text: "Scan and order. Quick and easy!Your customers will love it!",
    delay: "1300ms",
  },
  {
    icon: <LocationOn sx={{ fontSize: { xs: "30px", sm: "50px" } }} />,
    text: "Sarr Mal supports multiple locations for your business.",
    delay: "1500ms",
  },
  {
    icon: <ChecklistIcon sx={{ fontSize: { xs: "30px", sm: "50px" } }} />,
    text: "Backoffice and order apps are included in every subscription.",
    delay: "1700ms",
  },
];

const Features = () => {
  return (
    <Box
      sx={{
        mt: { xs: 7, sm: 9 },
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 1 }}
        fontSize={{ xs: 25, sm: 30 }}
        fontWeight="bold"
        color="#00235B"
      >
        Our Services
      </Typography>
      <Card
        sx={{
          minWidth: 300,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 250,
          bgcolor: "white",
        }}
        variant="outlined"
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
              <Card
                sx={{
                  textAlign: "center",
                  width: { xs: 90, sm: 90, md: 200 },
                  mb: 8,
                  mr: 2,
                  alignItems: "center",
                  boxShadow: 3,
                  bgcolor: "#00235B",
                }}
              >
                <Typography color="white">{item.icon}</Typography>

                <Typography
                  variant="h6"
                  color="white"
                  fontSize={{ xs: 10, sm: 12 }}
                >
                  {item.text}
                </Typography>
              </Card>
            </Zoom>
          );
        })}
      </Card>
    </Box>
  );
};

export default Features;
