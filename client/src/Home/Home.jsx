import {
  Container,
  Typography,
  Button,
  Collapse,
  Alert,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [checked, setCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setCheck(true);
  }, []);

  const isLoggedIn = localStorage.getItem("loggedIn");

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    isLoggedIn ? navigate("/todo") : setOpen(true);
  };

  return (
    <div>
      <Container
        sx={{
          maxWidth: { md: "50%", xs: "100%" },
          height: "100%",
          marginTop: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Collapse
          in={checked}
          {...(checked ? { timeout: 1000 } : {})}
          collapsedheight={50}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              align="center"
              sx={{
                fontSize: {
                  xl: "48px",
                  lg: "45px",
                  md: "38px",
                  sm: "32px",
                  xs: "25px",
                },
                fontWeight: "800",
              }}
            >
              Organize your work and life, finally.
            </Typography>
            <Typography
              align="center"
              sx={{
                fontSize: { lg: "20px", md: "18px", sm: "16px" },
                fontWeight: "400",
              }}
            >
              Become focused, organized, and calm with Todolist. The world’s #1
              task manager and to-do list app.
            </Typography>

            <Button
              variant="contained"
              size="large"
              color="error"
              align="center"
              sx={{ marginTop: "40px", marginBottom: "40px" }}
              onClick={handleClick}
            >
              Start
            </Button>
          </Box>
        </Collapse>
      </Container>
      <Snackbar autoHideDuration={4000} open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please login to continue
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
