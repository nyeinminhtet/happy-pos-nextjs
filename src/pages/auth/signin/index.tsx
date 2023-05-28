import Layout from "@/Components/Layout";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import React from "react";

const SignIn = () => {
  return (
    <Layout title="Sign-In">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
        }}
      >
        <Button
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          Sign in with google
        </Button>
      </Box>
    </Layout>
  );
};

export default SignIn;
