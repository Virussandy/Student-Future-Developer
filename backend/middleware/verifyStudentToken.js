// backend/middleware/verifyStudentToken.js

const jwt = require('jsonwebtoken');

const verifyStudentToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use same JWT_SECRET as student login
    req.studentId = decoded.id; // 🔑 this is used in getHomework controller
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyStudentToken;
