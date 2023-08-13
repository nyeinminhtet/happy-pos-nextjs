import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  color?: "primary" | "secondary" | "error" | "success";
}

const Loading = ({ color = "primary" }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress color={color} />
      <Typography sx={{ fontFamily: "monospace", mt: 2 }}>
        please wait...
      </Typography>
    </Box>
  );
};

export default Loading;
