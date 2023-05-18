import {
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../Components/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { config } from "../config/config";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  //register
  const register = async () => {
    const isValid =
      user.name.length > 0 && user.email.length > 0 && user.password.length > 0;
    if (!isValid) return setOpen(true);
    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      console.log(await response.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      ></IconButton>
    </>
  );

  return (
    <Layout>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          mt: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Please fill the form"
          action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        />
        <TextField
          sx={{ minWidth: "400px" }}
          id="filled-basic"
          label="Name"
          variant="filled"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          sx={{ minWidth: "400px" }}
          id="filled-basic"
          label="Email"
          variant="filled"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          sx={{ minWidth: "400px" }}
          id="filled-basic"
          label="Password"
          type="password"
          variant="filled"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            m: 2,
          }}
        >
          <Button variant="contained" onClick={register}>
            Register
          </Button>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography sx={{ mt: 2, cursor: "pointer" }}>Sign in</Typography>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
};

export default Register;
