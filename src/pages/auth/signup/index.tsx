import { Card, Typography } from "@mui/joy";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
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
            Create new account
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
              We need your account to create default data.
            </Typography>
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: { xs: "10px", sm: "13px" },
                color: "#00235B",
                mt: 2,
              }}
            >
              First, Signup with Google I will make default data for your
              company,and then you can change what you want.
            </Typography>
          </Card>
        </Box>
        <Button
          variant="contained"
          sx={{ bgcolor: "#00235B", mb: 5 }}
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          <FcGoogle size={15} style={{ marginRight: 5 }} />
          Sign-Up
        </Button>

        <Typography sx={{ color: "gray" }}>
          Already have an account?{" "}
          <Link href="/auth/signin" style={{ color: "darkblue" }}>
            Signin
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default SignUp;
