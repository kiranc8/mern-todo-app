const { getUserCollection } = require("../utilities/connection");

const generateId = () => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substr(2);
  return head + tail;
};

const findUser = (email) => {
  return getUserCollection().then((model) => {
    return model.findOne({ email: email }).then((userData) => {
      if (userData === null) {
        return null;
      } else {
        return userData;
      }
    });
  });
};

const addUser = (firstname, lastname, email, password, userId) => {
  return getUserCollection().then((model) => {
    return model.findOne({ email: email }).then((userData) => {
      if (userData === null) {
        let newUser = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          userId: userId,
        };
        model
          .insertMany([newUser])
          .then()
          .catch((error) => {
            let err = new Error("Some error occured");
            throw err;
          });
        return "Registered Successfully";
      } else {
        return "User Already Registered";
      }
    });
  });
};

const changePass = (userId,password,newpassword) =>{
  return getUserCollection().then(model=>{
    return model.find({userId:userId}).then(userData=>{
      if(userData[0].password===newpassword){
        return "Current password and new password are same";
      }
      else if(userData[0].password===password){
        return model.updateOne({userId:userId},{$set:{"password":newpassword}}).then(res=>{
          return "Password Changed Successfully";
        }).catch(error=>{
          console.log(error);
        })
      }
      else{
        return "Entered incorrect password";
      }
    })
  })
}

module.exports = { addUser, findUser, generateId,changePass };
