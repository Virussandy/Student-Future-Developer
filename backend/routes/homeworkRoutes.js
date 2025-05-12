const express = require("express");
const router = express.Router();
const { getHomework } = require("../controllers/homeworkController");
const verifyStudentToken = require("../middleware/verifyStudentToken");

router.get("/homework", verifyStudentToken, getHomework);

module.exports = router;
