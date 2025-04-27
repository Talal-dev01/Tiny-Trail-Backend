const mongoose = require("mongoose");

//DATABASE CONNECTION

const handleDBConnection = () => {
  return mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB-CONNECTED"))
    .catch((err) => console.log("DB-ERROR", err));
};

module.exports = handleDBConnection;
