import React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import { TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { baseUrl } from "../Constants/Constants";
const ChangePassword = () => {
  const userId = localStorage.getItem("userId");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState();
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    name === "currentpassword" ? setPassword(value) : setNewPassword(value);
    if (name === "newpassword") {
      validateField(value);
    }
  };

  const validateField = (value) => {
    let passwordRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,20}$/;
    if (!value.match(passwordRegx) || value === "") {
      setPassErr(
        "Password should contain atleast one special char,number,capital and small letter"
      );
    } else {
      setPassErr("");
    }
  };

  const handleSubmit = (e) => {
    if (password==="") {
      setMessage(
        "current password can't be empty"
      );
      setOpen(true);
    }
    else if (newPassword==="") {
      setMessage(
        "New password can't be empty"
      );
      setOpen(true);
    }
    else if (passErr) {
      setMessage(
        "Password should contain atleast one special char,number,capital and small letter"
      );
      setOpen(true);
    }
    else {
      e.preventDefault();
      let formObj = {
        userId: userId,
        password: password,
        newPassword: newPassword,
      };
      formSubmit(formObj);
    }
  };

  const formSubmit = (formObj) => {
    axios
      .put(`${baseUrl}/user/changepassword`, formObj)
      .then((response) => {
        if (response.data === "Password Changed Successfully") {
          setSuccessMsg(response.data);
          setMessage("");
          setOpen(true);
        } else {
          setMessage(response.data);
          setSuccessMsg("");
          setOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Container
        maxWidth="xs"
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{ marginBottom: "5px", fontSize: "25px", fontWeight: "800" }}
        >
          RESET PASSWORD
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          onChange={handleChange}
          id="currentpassword"
          label="Current Password"
          name="currentpassword"
          value={password}
          autoFocus
          type="password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          onChange={handleChange}
          id="newpassword"
          label="New Password"
          name="newpassword"
          type="password"
          autoFocus
          value={newPassword}
          helperText={passErr}
          error={passErr ? true : false}
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
          Change password
        </Button>
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

export default ChangePassword;
