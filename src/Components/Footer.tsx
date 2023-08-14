import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        height: { xs: 250, sm: 200, md: 150 },
        bgcolor: "#00235B",
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
            <Typography variant="body1" sx={{ color: "white" }}>
              103th street,bet 52 & 53th street <br />
              ChanMyaTharZi, Mandalay <br />
              <span style={{ color: "#FFDD83" }}> contact@sarrmal.com</span>
              <br />
              <span style={{ color: "#00235B" }}>+95 123 456 79</span>
            </Typography>
          </Box>
          <Box sx={{ width: "350px", position: "relative", mt: 2 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: "white", fontSize: { xs: 40, sm: 45 } }}
            >
              Sarr Mal
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
