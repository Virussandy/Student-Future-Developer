const Student = require('../models/Student');
// const Homework = require('../../../Admin_Panel/backend/models/Homework');
 // Path to Admin's Homework model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup Controller
exports.signup = async (req, res) => {
  const { name, email, classNumber, password } = req.body;

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      name,
      email,
      classNumber,
      password: hashedPassword
    });

    await student.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering student' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { name, password,email} = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!email) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: '2d'
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      student: {
        name: student.name,
        email: student.email,
        classNumber: student.classNumber,
        id: student._id
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

// Get Student Info (Dashboard)
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId).select('-password');
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student info' });
  }
};

// Fetch Homework for Student's Class
// exports.getHomework = async (req, res) => {
//   try {
//     const student = await Student.findById(req.studentId);
//     const homeworkList = await Homework.find({ classNumber: student.classNumber });
//     res.json(homeworkList);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching homework' });
//   }
// };
