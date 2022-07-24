const { addUser, findUser, generateId , changePass} = require("../models/userModel");

const checkUser = (email, password) => {
  return findUser(email).then((userData) => {
    if (userData == null) {
      let err = new Error("User not available!! Please register");
      err.status = 404;
      throw err;
    } else {
      if (userData.email === email && userData.password === password) {
        return userData;
      } else {
        let message = "Incorrect username or password";
        return message;
      }
    }
  });
};

const registerUser = (firstname, lastname, email, password) => {
  const userId = generateId();
  return addUser(firstname, lastname, email, password, userId).then(
    (message) => {
      return message;
    }
  ).catch(err=>{
    return err.message;
  });
};

const changePassword = (userId,password,newpassword)=>{
  return changePass(userId,password,newpassword).then(message=>{
    return message;
    }).catch(err=>{
      return err.message;
    });
};

module.exports = { registerUser, checkUser ,changePassword};
