const { getTodoCollection } = require("../utilities/connection");

const generateId = () => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substr(2);
  return head + tail;
};

const getDate = () => {
  const date = new Date();
  return date.getDate() + "-" + (date.getMonth()+1)+ "-" + date.getFullYear();
};

const addNote = (task, date, status, taskId, userId) => {
  return getTodoCollection().then((model) => {
    let newNote = {
      task: task,
      date: date,
      status: status,
      id: taskId,
      userId: userId,
    };
    model
      .insertMany([newNote])
      .then()
      .catch((error) => {
        let err = new Error("Some error occured");
        throw err;
      });
    return "Task added";
  });
};

const getTasksData = (userId) => {
  return getTodoCollection().then((model) => {
    return model
      .find({ userId: userId }, { _id: 0, __v: 0 })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        let err = new Error("Some error occured");
        throw err;
      });
  });
};

const deleteTaskById = (id) => {
  return getTodoCollection().then((model) => {
    return model
      .deleteOne({ id: id })
      .then((res) => {
        return "Deleted Successfully";
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const updateTaskById = (id, field, value) => {
    return getTodoCollection().then((model) => {
      return model
        .updateOne({ id: id }, { $set: { [`${field}`]: value } })
        .then((res) => {
          return "Updated Successfully";
        })
        .catch((error) => {
          console.log(error);
        });
    });
};

module.exports = {
  generateId,
  getDate,
  addNote,
  getTasksData,
  deleteTaskById,
  updateTaskById,
};
