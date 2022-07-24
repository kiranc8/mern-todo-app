const { json } = require("express");
const express = require("express");
const router = express.Router();
const { registerUser, checkUser , changePassword } = require("../controllers/userController");

//To login
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  checkUser(email, password)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      if (err.message === "User not available!! Please register") {
        res.send("User not available!! Please register");
      }
      else{
        res.send("Internal Server Error");
      }
    });
});

// To register
router.post("/register", (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  registerUser(firstname, lastname, email, password)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => next(err));
});

router.put("/changepassword",(req,res)=>{
  const {userId,password,newPassword} = req.body;
  changePassword(userId,password,newPassword).then(result=>{
    res.send(result)
  }).catch(err=>next(err));
})

module.exports = router;
