const jwt = require("jsonwebtoken");
const ensuresAuthenticated = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({
      message: "Unauthorized Jwt Token is required",
      success: false,
    });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Jwt Token is Expire or Try again",
    });
  }
};

module.exports = ensuresAuthenticated;
