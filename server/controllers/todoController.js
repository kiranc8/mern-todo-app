const {
  addNote,
  generateId,
  getDate,
  getTasksData,
  deleteTaskById,
  updateTaskById,
} = require("../models/todoModel");

const storeNote = (task,userId) => {
  const taskId = generateId();
  const date = getDate();
  const status = "To do";
  return addNote(task, date, status, taskId,userId).then((message) => {
    return message;
  });
};

const getTasks = (userId) => {
  return getTasksData(userId).then((result) => {
    return result;
  });
};

const deleteTask = (id) => {
  return deleteTaskById(id).then((result) => {
    return result;
  });
};

const updateTask = (id, field, value) => {
  return updateTaskById(id, field, value).then((result) => {
    return result;
  });
};

module.exports = { storeNote, getTasks, deleteTask, updateTask };
