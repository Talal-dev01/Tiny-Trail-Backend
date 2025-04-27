const { handleGetUid } = require("../Services/auth");

const handleAuthentication = async (req, res, next) => {
  try {
    console.log(req.cookies, "COOKIES");
    const authId = req.cookies?.token; // COOKIE METHOD
    console.log("AUTH ID:", authId);
    if (!authId) return next(); // No token, proceed as unauthenticated

    const user = handleGetUid(authId);
    console.log(user, "user"); // Decode or validate the token
    req.user = user; // Attach user to the request
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    next(); // Proceed without user if there's an error
  }
};

const restrictToAuthorized = (allowedRoles) => {
  return (req, res, next) => {
    console.log(req.user, "USER IN RESTRICT TO AUTHORIZED");
    const publicRoutes = ["/api/url/:shortId"];
    if (publicRoutes.some((route) => req.path.startsWith(route))) {
      return next(); // Skip authorization for public routes
    }

    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  };
};

module.exports = { handleAuthentication, restrictToAuthorized };
