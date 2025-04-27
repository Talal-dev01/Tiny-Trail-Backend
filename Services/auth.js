// const hashMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "nakryaar_1";

const handleSetUid = (user) => {
  // hashMap.set(uid, user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
};
const handleGetUid = (token) => {
  // return hashMap.get(uid);
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};

module.exports = { handleSetUid, handleGetUid };
