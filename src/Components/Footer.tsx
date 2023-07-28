import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        height: 150,
        bgcolor: "#4E6C50",
        px: "12px",
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          m: "0 auto",
          display: "flex",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
              Ywar Lal street, <br />
              ChanMyaTharZi, Mandalay <br />
              contact@happypos.com
              <br />
              +95 123 456 79
            </Typography>
          </Box>
          <Box sx={{ width: "350px", position: "relative", mt: 2 }}>
            <Typography variant="h3" color="#00235B" fontWeight="bold">
              Sarr Mal
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
              Order app
              <br /> Backoffice app
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
