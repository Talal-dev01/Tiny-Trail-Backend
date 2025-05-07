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
  res.status(201).redirect("/users/login");
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
    secure: true, // Always true for cross-site cookies (must use HTTPS)
    sameSite: "none", // Required for cross-site cookies
    // domain: "yourdomain.com", // REMOVE or set only if you know what you're doing
    path: "/",
  });
  if (user.role === "ADMIN") {
    return res.redirect("/admin");
  }
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
