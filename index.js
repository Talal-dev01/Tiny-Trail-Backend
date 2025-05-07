require("dotenv").config();
const express = require("express");
const app = express();
const urlRouter = require("./Routes/url");
const urlsRouter = require("./Routes/urls");
const userRouter = require("./Routes/user");
const PORT = process.env.PORT || 8080;
const handleDBConnection = require("./connect");
const {
  handleAuthentication,
  restrictToAuthorized,
} = require("./Middlewares/auth");
var cookieParser = require("cookie-parser");
const checkAuthRouter = require("./Routes/auth");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://tinytrail.vercel.app", // Your deployed frontend,
  "https://tiny-trail-rouge.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(handleAuthentication);

app.use("/api/url", urlRouter);
app.use("/api/urls", urlsRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", checkAuthRouter);

handleDBConnection();
app.listen(PORT, () => console.log(`SERVER STARTED AT: ${PORT}`));
