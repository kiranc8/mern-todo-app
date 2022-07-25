import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { baseUrl } from "../Constants/Constants";
const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passConfErr, setConfPassErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "firstname":
        setFirstname(value);
        break;
      case "lastname":
        setlastname(value);
        break;
      case "email":
        setEmail(value);
        validateField(name, value);
        break;
      case "password":
        setPassword(value);
        validateField(name, value);
        if (confirmpassword === value) {
          setConfPassErr("");
        }
        break;
      case "confirmpassword":
        setConfirmPassword(value);
        if (!password) {
          setConfPassErr("Please Enter password");
        } else if (password !== value) {
          setConfPassErr("Password and Confirm Password does not match.");
        } else {
          setConfPassErr("");
        }
        break;
      default:
        break;
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const validateField = (name, value) => {
    if (name === "email") {
      let emailRegx =
        /^([a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-9]*\.[a-z]+(\.[a-z]+)?)|[7-9][0-9]{9}$/;
      if (!value.match(emailRegx)) {
        setEmailErr("Enter a valid Email");
      } else {
        setEmailErr("");
      }
    } else {
      let passwordRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,20}$/;
      if (!value.match(passwordRegx)) {
        setPassErr(
          "Password should contain atleast one special char,number,capital and small letter"
        );
      } else {
        setPassErr("");
      }
    }
  };

  const handleSubmit = (e) => {
    if (
      confirmpassword === "" ||
      email === "" ||
      firstname === "" ||
      lastname === ""
    ) {
      setMessage("Please fill all the fields");
      setOpen(true);
    } else if (passErr || passConfErr || emailErr) {
      setMessage("Enter valid credentials");
      setOpen(true);
    } else {
      e.preventDefault();
      let formObj = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      };
      formSubmit(formObj);
    }
  };

  const formSubmit = (formObj) => {
    axios
      .post(`${baseUrl}/user/register`, formObj)
      .then((response) => {
        if (response.data === "Registered Successfully") {
          setMessage("");
          setSuccessMsg(response.data);
          setOpen(true);
          navigate("/login");
        } else {
          setSuccessMsg("");
          setMessage(response.data);
          setOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Container
        maxWidth="xs"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            margin: "0 auto",
            justifyContent: "space-between",
          }}
        >
          <TextField
            margin="normal"
            required
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            value={firstname}
            onChange={handleChange}
            autoFocus
            sx={{ width: "200px" }}
          />
          <TextField
            margin="normal"
            required
            name="lastname"
            label="Lastname"
            id="lastname"
            value={lastname}
            onChange={handleChange}
            autoComplete="lastname"
            sx={{ width: "200px", marginLeft: "10px" }}
          />
        </Box>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={handleChange}
          helperText={emailErr}
          error={emailErr ? true : false}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          helperText={passErr}
          error={passErr ? true : false}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmpassword"
          label="Confirm Password"
          type="password"
          id="confirmpassword"
          autoComplete="current-password"
          value={confirmpassword}
          onChange={handleChange}
          helperText={passConfErr}
          error={passConfErr ? true : false}
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
          Sign Up
        </Button>
        <Grid item>
          <Link
            variant="caption"
            color="inherit"
            onClick={() => navigate("/login")}
          >
            {"Already have an account? Sign In"}
          </Link>
        </Grid>
      </Container>
      <Snackbar autoHideDuration={4000} open={open} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {message ? message : successMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
