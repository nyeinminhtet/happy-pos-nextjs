import TopBar from "@/Components/TopBar";
import { Box, Button } from "@mui/material";
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
          backgroundColor: "#E8F6EF",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Button
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
