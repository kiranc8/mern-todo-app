import { Beenhere } from "@mui/icons-material";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/system";

const Navbar = () => {
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  let isLoggedIn = localStorage.getItem("loggedIn");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const signIn = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };

  const handleClick = (event) => {
    setClick(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setClick(false);
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "80px",
      }}
    >
      <Container>
        <AppBar
          sx={{
            backgroundColor: "#ffffff",
            maxWidth: "100%",
          }}
          elevation={0}
        >
          <Toolbar sx={{ width: { md: "80%", xs: "95%" }, margin: "0 auto" }}>
            <Beenhere
              color="error"
              sx={{ fontSize: { sm: "40px", xs: "25px" } }}
            />
            <Typography
              color="error"
              sx={{
                marginLeft: { md: "10px", xs: "0px" },
                fontSize: { sm: "32px", xs: "25px" },
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              todolist
            </Typography>
            {isMatch ? (
              click ? (
                <CloseIcon
                  color="error"
                  onClick={handleClose}
                  sx={{
                    marginLeft: "auto",
                    fontSize: "35px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <SortIcon
                  onClick={handleClick}
                  color="error"
                  sx={{
                    marginLeft: "auto",
                    fontSize: "35px",
                    cursor: "pointer",
                  }}
                />
              )
            ) : isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginLeft: "auto", marginRight: "10px" }}
                  onClick={logout}
                >
                  Logout
                </Button>
                <Avatar sx={{ backgroundColor: "#d32f2f", cursor: "pointer" }} onClick={()=>navigate("/profile")}>
                  <PersonIcon />
                </Avatar>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  sx={{ marginLeft: "auto" }}
                  onClick={signIn}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginLeft: "10px" }}
                  onClick={register}
                >
                  Register
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Container>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 150, left: 450 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {isLoggedIn ? (
          <div>
            <MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem>
              <Button variant="text" onClick={signIn}>
                Login
              </Button>
            </MenuItem>
            <MenuItem>
              <Button variant="contained" color="error" onClick={register}>
                Register
              </Button>
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default Navbar;
