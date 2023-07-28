import { Box, CircularProgress } from "@mui/material";

interface Props {
  color?: "primary" | "secondary" | "error" | "success";
}

const Loading = ({ color = "primary" }: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color={color} />
    </Box>
  );
};

export default Loading;
