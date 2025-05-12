const Homework = require("../models/Homework");
const Student = require("../models/Student");

exports.getHomework = async (req, res) => {
  try {
    console.log("✅ Inside getHomework route");
    console.log("🔑 Decoded studentId:", req.studentId);

    const student = await Student.findById(req.studentId);
    console.log("🎓 Student found:", student);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const homeworkList = await Homework.find({ classNumber: student.classNumber });
    console.log("📄 Homework fetched:", homeworkList);

    res.json(homeworkList);
  } catch (err) {
    console.error("❌ Error fetching homework:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
