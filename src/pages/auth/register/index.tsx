import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { config } from "@/config/config";
import Layout from "@/Components/Layout";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const Register = async () => {
    const isValid =
      user.name.length > 0 && user.email.length > 0 && user.password.length > 0;
    if (!isValid) return setOpen(true);
    const response = await fetch(
      `${config.apiBackofficeBaseUrl}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    console.log(await response.json());
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
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Please enter email and password"
          action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 400,
            minWidth: 400,
            mt: 5,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(evt) => setUser({ ...user, name: evt.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(evt) => setUser({ ...user, email: evt.target.value })}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            sx={{ mb: 2 }}
            onChange={(evt) => setUser({ ...user, password: evt.target.value })}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              mt: 5,
            }}
          >
            <Button variant="contained" onClick={Register}>
              Register
            </Button>
            <Link href="/login">
              <Typography variant="body1" sx={{ mt: 2 }}>
                Login
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Register;
