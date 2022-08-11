import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const Profile = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  return (
    <div>
      <Container
        maxWidth="sm"
        sx={{
          height: '80vh',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            src="/broken-image.jpg"
            sx={{ width: "150px", height: "150px" }}
          />
          <Typography sx={{ marginTop: "20px", fontSize: "25px" }}>
            {name}
          </Typography>
          <Typography sx={{ marginTop: "5px", fontSize: "18px" }}>
            {email}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ width: "300px", height: "50px", marginTop: "50px" }}
            onClick={() => navigate("/changepassword")}
          >
            change password
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Profile;
