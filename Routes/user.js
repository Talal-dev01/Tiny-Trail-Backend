const express = require("express");
const {
  handleSignUp,
  handleLogIn,
  handleSignUpPage,
  handleLogInPage,
} = require("../Controllers/user");
const userRouter = express.Router();

userRouter.post("/", handleSignUp);
userRouter.post("/login", handleLogIn);
userRouter.get("/signup", handleSignUpPage);
userRouter.get("/login", handleLogInPage);

module.exports = userRouter;
