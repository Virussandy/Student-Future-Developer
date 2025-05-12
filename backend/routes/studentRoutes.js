const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getStudent
} = require('../controllers/studentController');
const { getHomework } = require("../controllers/homeworkController");
const studentAuth = require('../middleware/studentAuthMiddleware');
const verifyStudentToken = require("../middleware/verifyStudentToken");

// Public Routes
router.post('/signup', signup);
router.post('/login', login);

// Protected Routes
router.get('/dashboard', studentAuth, getStudent);
router.get("/homework", verifyStudentToken, getHomework);

module.exports = router;
