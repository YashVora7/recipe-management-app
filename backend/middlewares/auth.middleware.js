const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verified);
    req.user = verified.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: "invalid token", details: error.message });
  }
};

module.exports = auth;
