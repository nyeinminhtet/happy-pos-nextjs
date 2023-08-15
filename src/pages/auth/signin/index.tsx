import { Card, Typography } from "@mui/joy";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: { xs: 300, sm: 500, md: 600 },
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
            level="h2"
            sx={{
              fontFamily: "monospace",
              fontSize: { xs: "14px", sm: "20px", md: "25px" },
            }}
          >
            Who are you?
          </Typography>
          <Card>
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: { xs: "10px", sm: "15px" },
                fontWeight: "bold",
                mt: 2,
              }}
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
            >
              If your are mostly new user, don't worry I will make default data
              for your company,and then you can change what you want.
            </Typography>
          </Card>
        </Box>
        <Button
          variant="contained"
          sx={{ bgcolor: "#00235B", mb: 5 }}
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          <FcGoogle size={15} style={{ marginRight: 5 }} />
          Sign-In
        </Button>
      </Card>
    </Box>
  );
};

export default SignIn;
