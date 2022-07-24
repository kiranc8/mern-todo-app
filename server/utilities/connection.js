const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userSchema = Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    userId:String,
  },
  { collection: "User" }
);

const todoSchema = Schema(
  {
    task:String,
    date:String,
    status:String,
    id:String,
    userId:String
  },
  {collection:"Notes"}
)
const getUserCollection = () => {
  return mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((database) => {
      return database.model("User", userSchema);
    })
    .catch(() => {
      let err = new Error("Couldn't connect to Database");
      err.status = 500;
      throw err;
    });
};

const getTodoCollection = () => {
  return mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((database) => {
      return database.model("Notes", todoSchema);
    })
    .catch(() => {
      let err = new Error("Couldn't connect to Database");
      err.status = 500;
      throw err;
    });
};
module.exports = {getUserCollection,getTodoCollection};
