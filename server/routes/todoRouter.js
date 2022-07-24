const { json } = require("express");
const express = require("express");
const router = express.Router();
const {
  storeNote,
  getTasks,
  deleteTask,
  updateTask,
} = require("../controllers/todoController");

// To add tasks
router.post("/add", (req, res, next) => {
  const { task, userId } = req.body;
  storeNote(task, userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => next(err));
});

//To get tasks
router.get("/get", (req, res, next) => {
  let { userId } = req.query;
  getTasks(userId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send([]);
    });
});

//To delete a task
router.delete("/delete", (req, res, next) => {
  let { id } = req.query;
  deleteTask(id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

//To update a task
router.put("/update", (req, res, next) => {
  let { id, field, value } = req.query;
  updateTask(id, field, value)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
