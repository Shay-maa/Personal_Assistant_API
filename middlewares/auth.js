const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    // const token = req.header("Authorization").replace("Bearer ", "");
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
       throw new Error();
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    console.error(err);
    res.status(401).json({ error: "Please authenticate" });
  }
};

module.exports = auth;
