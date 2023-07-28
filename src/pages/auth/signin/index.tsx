import TopBar from "@/Components/TopBar";
import { Box, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Box>
      <Box sx={{ position: "relative", zIndex: 999 }}>
        <TopBar />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#E8F6EF",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Typography sx={{ mb: 10, fontFamily: "monospace" }} variant="h4">
          Please Signin to enter Backoffice app.
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: "#E21818", ":hover": { bgcolor: "#E21818" } }}
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
