const User = require("../Models/user");
const { v4: uuidv4 } = require("uuid");
const { handleSetUid } = require("../Services/auth");
const handleSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    msg: "User created successfully",
  });
};

const handleLogIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email, password });
  if (!user)
    return res.json({
      msg: "ALL credentials are neccessary",
    });

  //JWT METHOD
  const token = handleSetUid(user);

  // //JWT WITH COOKIE METHOD
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: "/",
  });
  res.json({
    message: "Logged in successfully",
  });
  //JWT WITH RESPONSE METHOD (AUTHORIZATION)
  // res.json(token);

  //SESSION ID METHOD
  // const uid = uuidv4();
  // handleSetUid(uid, user);
};

const handleSignUpPage = async (req, res) => {
  res.render("signup");
};

const handleLogInPage = async (req, res) => {
  res.render("login");
};

module.exports = {
  handleSignUp,
  handleSignUpPage,
  handleLogInPage,
  handleLogIn,
};
