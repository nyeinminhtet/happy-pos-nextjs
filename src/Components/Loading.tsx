import { Box } from "@mui/material";
import { Metronome } from "@uiball/loaders";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "70vh",
      }}
    >
      <Metronome size={50} speed={1.6} color="black" />
    </Box>
  );
};

export default Loading;
