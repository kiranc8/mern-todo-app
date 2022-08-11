import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Loader from "../Loader/Loader";
import { baseUrl } from "../Constants/Constants";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    name === "email" ? setEmail(value) : setPassword(value);
    validateField(name, value);
  };
  const validateField = (name, value) => {
    if (name === "email") {
      let emailRegx =
        /^([a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-9]*\.[a-z]+(\.[a-z]+)?)|[7-9][0-9]{9}$/;
      if (!value.match(emailRegx) || value === "") {
        setEmailError("Enter a valid Email");
      } else {
        setEmailError("");
      }
    } else {
      let passwordRegx =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!value.match(passwordRegx) || value === "") {
        setPasswordError(
          "Password must have atleast 8 char one uppercase one lowercase one special case and one num"
        );
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      setMessage("Please enter email");
      setOpen(true);
    } else if (password === "") {
      setMessage("Please enter password");
      setOpen(true);
    } else if (emailError || passwordError) {
      setMessage("Please enter valid username or password");
      setOpen(true);
    } else {
      let formObj = { email: email, password: password };
      formSubmit(formObj);
    }
  };

  const formSubmit = (formObj) => {
    displayLoader();
    axios
      .post(`${baseUrl}/user/login`, formObj)
      .then((response) => {
        if (
          response.data === "User not available!! Please register" ||
          response.data === "Incorrect username or password"
        ) {
          setMessage(response.data);
          hideLoader();
          setOpen(true);
        } else {
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("name", response.data.firstname);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("email", response.data.email);
          hideLoader();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayLoader = () => {
    setLoader(false);
  };
  const hideLoader = () => {
    setLoader(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      {loader ? (
        <Container
          maxWidth="xs"
          sx={{
            height: "75vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CssBaseline />
          <Avatar sx={{ m: 1, backgroundColor: "#d32f2f" }}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            helperText={emailError}
            error={emailError ? true : false}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            onChange={handleChange}
            value={password}
            helperText={passwordError}
            error={passwordError ? true : false}
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#db4c3f",
              padding: "16px",
              mt: 3,
              mb: 2,
              "&:hover": { backgroundColor: "#d85c51" },
            }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>

          <Grid item>
            <Link
              variant="caption"
              color="inherit"
              onClick={() => navigate("/register")}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Container>
      ) : (
        <Loader />
      )}
      <Snackbar autoHideDuration={4000} open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
