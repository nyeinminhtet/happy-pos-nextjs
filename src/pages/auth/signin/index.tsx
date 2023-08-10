import TopBar from "@/components/TopBar";
import { Box, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        border: 1,
        width: { xs: 300, sm: 400, md: 600 },
        m: "0 auto",
        bgcolor: "white",
        borderRadius: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 2,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: { xs: "14px", sm: "20px", md: "25px" },
            color: "lightgreen",
          }}
          variant="h2"
        >
          You need to be Login with Google.
        </Typography>
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: { xs: "10px", sm: "15px" },
            fontWeight: "bold",
            mt: 2,
          }}
          variant="body1"
        >
          Your account and Company are require to enter backoffice.
        </Typography>
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: { xs: "10px", sm: "13px" },
            color: "#00235B",
            mt: 2,
            ml: { md: 5 },
          }}
          variant="body1"
        >
          If your are mostly new user, don't worry I will make default data for
          your company,and then you can change what you want.
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ bgcolor: "#00235B", mb: 5 }}
        onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
      >
        <FcGoogle size={15} style={{ marginRight: 5 }} />
        Sign-In
      </Button>
    </Box>
  );
};

export default SignIn;
