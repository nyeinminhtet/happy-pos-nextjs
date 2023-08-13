import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  color?: "primary" | "secondary" | "error" | "success";
}

const Loading = ({ color = "primary" }: Props) => {
  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     flexDirection: "column",
    //   }}
    // >
    //   <CircularProgress color={color} />
    //   <Typography sx={{ fontFamily: "cursive", mt: 2 }}>Loading...</Typography>
    // </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="main-item">
        <div className="static-background">
          <div className="background-masker btn-divide-left"></div>
        </div>

        <div className="animated-background">
          <div className="background-masker btn-divide-left"></div>
        </div>
        <Box sx={{ display: "flex", m: 1 }}>
          <div className="css-dom" />
          <div className="css-dom" />
        </Box>
      </div>
    </Box>
  );
};

export default Loading;
