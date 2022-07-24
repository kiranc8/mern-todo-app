import { React, useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Avatar,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { InputAdornment } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { baseUrl } from "../Constants/Constants";

const Todo = () => {
  const userId = localStorage.getItem("userId");
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrMsg] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "task",
      headerName: "Name",
      width: 200,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date Created",
      width: 200,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      type: "boolean",
      renderCell: (params) => (
        <DeleteIcon
          color="error"
          cursor="pointer"
          onClick={() => handleDelete(params.id)}
        />
      ),
    },
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = () => {
    if (task === "") {
      setMessage("");
      setErrMsg("This field cannot be blank");
      setOpen(true);
    } else {
      let formObj = {
        task: task,
        userId: userId,
      };
      formSubmit(formObj);
    }
  };
  const formSubmit = (formObj) => {
    axios
      .post(`${baseUrl}/todo/add`, formObj)
      .then((response) => {
        setMessage(response.data);
        setOpen(true);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadData = () => {
    axios.get(`${baseUrl}/todo/get?userId=${userId}`).then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    axios.get(`${baseUrl}/todo/get?userId=${userId}`).then((response) => {
      setData(response.data);
    });
  });

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/todo/delete?id=${id}`)
      .then((response) => {
        setMessage(response.data);
        setOpen(true);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCellEditCommit = (params) => {
    const { id, field, value } = params;
    axios
      .put(`${baseUrl}/todo/update?id=${id}&field=${field}&value=${value}`)
      .then((response) => {
        setMessage(response.data);
        setOpen(true);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container
        maxWidth="md"
        sx={{
          height: "100%",
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          width="100%"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            id="filled-basic"
            label="Add Task"
            variant="outlined"
            fullWidth
            onChange={(e) => setTask(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Add Task" placement="bottom-end">
                    <Avatar
                      sx={{
                        m: 1,
                        backgroundColor: "#d32f2f",
                        cursor: "pointer",
                      }}
                      onClick={handleSubmit}
                    >
                      <AddIcon
                        sx={{
                          fontSize: { sm: "40px", xs: "25px" },
                          color: "white",
                        }}
                      />
                    </Avatar>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            height: 423,
            width: "100%",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            autoPageSize={true}
            pageSize={6}
            checkboxSelection
            disableSelectionOnClick
            onCellEditCommit={onCellEditCommit}
          />
        </Box>
      </Container>
      <Snackbar autoHideDuration={4000} open={open} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message ? message : errorMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Todo;
